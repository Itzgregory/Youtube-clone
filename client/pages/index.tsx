import { getVideos } from '../api';
import { VideoTeaser } from '../components';
import { video } from '../interface';
import { Box, Flex, Title } from '@mantine/core';

const Home = ({ videos }: { videos: Array<video> }) => {
  return (
    <>
      <Title align='center'>Wellcome to LegendaryTube</Title>
      <Box p='xs'>
        <Flex
        mt={50}
          gap="xs"
          justify="flex-start"
          align="center"
          direction="row"
          wrap="wrap"> {
            (videos || []).map((video: video) => {
              return <VideoTeaser key={video.videoId} video={video} />
            })
          }</Flex>
      </Box>
    </>
  )
}

export const getServerSideProps = async () => {
  const videos = await getVideos()
  return {
    props: {
      videos: videos
    }
  }
}
export default Home