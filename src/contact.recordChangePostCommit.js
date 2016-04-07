import API from '../lib/api'

export function handler (event, { succeed, fail }) {
  console.log(`event: ${JSON.stringify(event, null, 2)}`)
  const { payload: { record: { id, apiName }, priorState, changeSet } } = event
  const request = API(event)
  const done = (e, res) => e ? fail(e) : succeed(res)

  if (!changeSet.hasOwnProperty('first_name') && !changeSet.hasOwnProperty('last_name')) {
    console.log('No name change, exiting.')
    return done()
  }

  const state = { ...priorState, ...changeSet }
  const { first_name, last_name } = state
  const name = `${first_name} ${last_name}`.trim() || 'Unnamed Contact'

  console.log(`Changing name from "${priorState.name}" to "${name}" with post to /v1/records/${apiName}/${id}.`)

  request({
    method: 'PATCH',
    path: `/v1/records/${apiName}/${id}`,
    body: { name }
  }, (res) => {
    console.log('res', res)
    done(null, res)
  })
}
