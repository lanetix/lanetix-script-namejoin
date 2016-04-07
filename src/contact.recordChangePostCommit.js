import API from '../lib/api'

export function handler (event, { succeed, fail }) {
  console.log(`event: ${JSON.stringify(event, null, 2)}`)
  const { record: { id, apiName }, priorState, changeSet } = event
  const request = API(event)
  const done = (e, res) => e ? fail(e) : succeed(res)
  const finalState = {...priorState, ...changeSet}

  if (changeSet.first_name || changeSet.first_name) {
    console.log('No name change, exiting.')
    return
  }

  const name =
  finalState.first_name && finalState.last_name ? `${finalState.first_name} ${finalState.last_name}`
  : finalState.first_name ? finalState.first_name
  : finalState.last_name ? finalState.last_name
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
