import "reflect-metadata"
import { join } from 'path'
import { Express } from 'express'
import Agent from 'elastic-apm-node'
import { connect as connectDB } from "../common/conn"

interface Config {
  dev: boolean
  apiFolder: string
  assetsFolder: string
  url: string
  jsonLimit: string
  extension: string
}


export const beforeParser = async (app: Express, config: Config) => {
  await connectDB()
  useApm(app)
}

export default async (app: Express, config: Config) => {
  app.use('*', (req, res) => res.sendFile(join(config.assetsFolder, 'index.html')))
}

function useApm(app: Express) {
  const { APM_SERVER = '' } = process.env
  if (APM_SERVER) {
    let apm = Agent.start({
      serverUrl: APM_SERVER,
    })
    apm.addSpanFilter(payload => {
      return payload.duration < 10 ? null : payload
    })
    app.use((req, res, next) => {
      let { url } = req
      let span = apm.startSpan(url, { childOf: 'url' })
      let done = () => {
        span.end()
        res.off('close', done)
      }
      res.on('close', done)
      next()
    })
  }
}