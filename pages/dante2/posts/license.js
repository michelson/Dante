//import {Readme as demo} from '../site/data/poc'
import {License as license} from '../../../data/poc'
import Dante from 'Dante2'

import Layout from '../../../components/Layout'

export default function License({ }) {
  return (
    <Layout basePath={"/dante2/"}>
		<Dante content={license} 
		style={{
				margin: '0 auto',
				width: '60%',
				padding: '100px 0px'
			}} read_only={true}
		/>
    </Layout>
  )
}