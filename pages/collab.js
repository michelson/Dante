


import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/Collab'))

export default function Index({ }) {

  return (
		<div>
			{
				process.browser &&
				<DynamicComponent/>
			}
		</div>
  )
}
