import "reflect-metadata"
import { join } from 'path'
import { Express } from 'express'
import Agent from 'elastic-apm-node'
import { connect } from "../common/conn"

interface Config {
  dev: boolean
  apiFolder: string
  assetsFolder: string
  url: string
  jsonLimit: string
  extension: string
}

export default async (app: Express, config: Config) => {
  const { APM_SERVER = '' } = process.env
  if (APM_SERVER) {
    Agent.start({
      serverUrl: APM_SERVER,
    })
  }
  await connect()
  app.use('*', (req, res) => res.sendFile(join(config.assetsFolder, 'index.html')))
}