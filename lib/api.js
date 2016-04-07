import https from 'https'
export default function API ({ jwt }) {
  if (!(jwt && typeof jwt === 'string')) throw new Error(`Invalid JWT: ${jwt}`)

  const defaults = {
    hostname: 'gateway.lanetix.com',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    }
  }

  return function request (opts, cb) {
    if (opts.headers) opts.headers = { ...defaults.headers, ...opts.headers }
    return https.request({ ...defaults, ...opts }, res => {
      let body = ''
      res.setEncoding('utf8')
      res.on('data', d => body += d)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          cb(null, parseJSON(body))
        } else {
          const error = new Error(`HTTP Response: ${res.statusCode}`)
          error.response = res
          error.response.body = parseJSON(body)
          cb(error)
        }
      })
    }).on('error', cb).end(opts.body && JSON.stringify(opts.body))
  }
}

function parseJSON (body) {
  try {
    return JSON.parse(body)
  } catch (e) {
    return body
  }
}
