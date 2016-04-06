/* eslint-env mocha */
import handler from '../../src/contact.recordChangePostCommit'

describe('contact', () => {
  describe('.on("recordChangePostCommit")', () => {
    beforeEach(() => {
      global.spy(handler)
      handler()
    })

    it('should have been run once', () => {
      global.expect(handler).to.have.been.calledOnce
    })
  })
})
