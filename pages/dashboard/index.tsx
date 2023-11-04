import { NextPage } from 'next'
import { Layout } from '../../components/Layout';

const Dashboard: NextPage = () => {
  
  return (
    <Layout>
      <div className='flex justify-center'>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Mint</button>
      </div>
    </Layout>
  )
}

export default Dashboard;