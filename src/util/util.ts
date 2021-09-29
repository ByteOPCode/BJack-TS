const logger = (() => ({
  log: console.log.bind(
    console,
    '[ErrorEvent ' + new Date().toLocaleTimeString() + ']'
  )
}))();

export { logger };
