import API from '../lib/api'

export function handler (event, { succeed, fail }) {
  console.log(`event: ${JSON.stringify(event, null, 2)}`)
  const { record: { id, apiName }, priorState, changeSet } = event
  const request = API(event)
  const done = (e, res) => e ? fail(e) : succeed(res)
  const body = {...priorState, ...changeSet}

  if (changeSet.first_name || changeSet.first_name) {
    console.log('No name change, exiting.')
    return
  }

  const name =
  body.first_name && body.last_name ? `${body.first_name} ${body.last_name}`
  : body.first_name ? body.first_name
  : body.last_name ? body.last_name
  : 'Unnamed Contact'

  console.log(`Changing name from "${priorState.name}" to "${name}".`)

  request({
    method: 'PATCH',
    path: `/v1/records/${apiName}/${id}`,
    body: { name }
  }, (res) => {
    console.log('res', res)
    done(res)
  })
}
