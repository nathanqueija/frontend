import {Component} from 'react'
import Link from 'next/link'
import Layout from 'components/shared/Shell'
import Error from 'components/auth/Error'
import {getCookie, removeCookie} from 'lib/session'
import {signIn, signUp, redirectIfAuthenticated, confirm} from 'lib/auth'

export default class Confirm extends Component {
  state = {
    error: null,
  }

  static async getInitialProps(ctx) {
    const {token} = ctx.req.params

    const res = await confirm(token)

    if (!res.user) {
      return {
        error: res,
      }
    }

    return {
      user: res.user,
    }
  }

  render() {
    const {user, error} = this.props
    const {name} = user

    return (
      <Layout>
        {name}
        {error}
      </Layout>
    )
  }
}
