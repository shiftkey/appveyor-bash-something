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

if (process.env.CI) {
  const child_process = ChildProcess.spawn(
    Path.resolve(__dirname, '..', 'node_modules', '.bin', 'eslint'),
    ESLINT_ARGS
  )

  const stdout = new Array<Buffer>()
  child_process.stdout.on('data', chunk => {
    stdout.push(chunk as Buffer)
  })

  const stderr = new Array<Buffer>()
  child_process.stderr.on('data', chunk => {
    stderr.push(chunk as Buffer)
  })

  child_process.stdout.once('close', () => {
    const output = Buffer.concat(stdout)
    console.log(`output: '${output}'`)
  })

  child_process.stderr.once('close', () => {
    const error = Buffer.concat(stderr)
    console.log(`error: '${error}'`)
  })

  child_process.on('error', err => {
    console.log(`error raised: ${err}`)
  })

  child_process.on('exit', (code, signal) => {
    console.log(`exit with code: ${code}`)
  })

} else {
  console.log('> Spinning up eslint_d\n')
  require('eslint_d/lib/client').lint(ESLINT_ARGS)
}