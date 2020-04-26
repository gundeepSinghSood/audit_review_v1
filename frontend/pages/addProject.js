import React from 'react'
import Head from 'next/head'
import {withAuthSync} from '../utils/auth';

const AddProject = () => (
  <div>
    <Head>
      <title>Project</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>Add Project</h1>
  </div>
)

export default withAuthSync(AddProject)
