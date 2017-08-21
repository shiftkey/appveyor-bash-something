#!/usr/bin/env ts-node

import ChildProcess = require('child_process')
import Path = require('path')

const ESLINT_ARGS = [
  '--cache',
  '--rulesdir=./eslint-rules',
  './{script,eslint-rules}/**/*.{j,t}s?(x)',
  './tslint-rules/**/*.ts',
  './app/{src,typings,test}/**/*.{j,t}s?(x)',
  ...process.argv.slice(2),
]
const opts = {
  stdio: 'inherit',
}

if (process.env.CI) {
  const cp = ChildProcess.spawn(
    Path.resolve(__dirname, '..', 'node_modules', '.bin', 'eslint'),
    ESLINT_ARGS,
    opts
  )

  const stdout = new Array<Buffer>()
  cp.stdout.on('data', chunk => {
    stdout.push(chunk as Buffer)
  })

  const stderr = new Array<Buffer>()
  cp.stderr.on('data', chunk => {
    stderr.push(chunk as Buffer)
  })

  cp.stdout.once('close', () => {
    const output = Buffer.concat(stdout)
    console.log(`output: '${output}'`)
  })

  cp.stderr.once('close', () => {
    const error = Buffer.concat(stderr)
    console.log(`error: '${error}'`)
  })

  cp.on('error', err => {
    console.log(`error raised: ${err}`)
  })

  cp.on('exit', (code, signal) => {
    console.log(`exit with code: ${code}`)
  })

} else {
  console.log('> Spinning up eslint_d\n')
  require('eslint_d/lib/client').lint(ESLINT_ARGS)
}