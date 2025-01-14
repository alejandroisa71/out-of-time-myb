import { SERIES } from '@/app/const/varDonutChart'
import {DonutChart, TreeMapChart} from '@/components'
import Image from 'next/image'



const mapDataForDonutChart = (series) => {
  const { data } = series[0]
  const donutSeries = []
  const donutLabels = []

  data.forEach(({ x: label, y: value }) => {
    donutSeries.push(value)
    donutLabels.push(label)
  })

  return {
    series: donutSeries,
    labels: donutLabels
  }
}

const getUserStats = async ({ username }) => {
  const res = await fetch(`https://api.github.com/users/${username}`)
  const data = await res.json()

  const donutChartData = mapDataForDonutChart(SERIES)

  return { ...data, series: SERIES, donutChartData }
}

export default async function DashboardPage ({ params }) {
  const data = await getUserStats({ username: params.username })

  return (
    <>
      <h1>Dashboard page 🤔</h1>
      <p>Dashboard for {params.username}</p>
      <TreeMapChart series={data.series} />
      <DonutChart data={data.donutChartData} />
      <p>{data.name}</p>
      <p>{data.bio}</p>
      <p>{data.location}</p>
      <p>{data.company}</p>
      <p>{data.blog}</p>
      <p>{data.twitter_username}</p>
      <p>{data.public_repos}</p>
      <p>{data.created_at}</p>
      <p>{data.updated_at}</p>
      <p>{data.html_url}</p>
      <Image src={data.avatar_url} alt={data.name} width={200} height={200} />
      <p>{params.username}</p>
    </>
  )
}