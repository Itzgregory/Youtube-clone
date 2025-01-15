import { useEffect } from 'react';
import { Box, Flex, Title, Loader } from '@mantine/core';
import { VideoTeaser } from '../components';
import { videosApi } from '../api/config';
import { video } from '../interface';
import { useQuery } from 'react-query';

const Home = () => {
  const { data: videos, isLoading, error } = useQuery<video[]>('videos', videosApi.getAll);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: '50vh' }}>
        <Loader size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box p="xl" style={{ textAlign: 'center' }}>
        <Title order={2} color="red">Error loading videos</Title>
      </Box>
    );
  }

  return (
    <>
      <Title align='center'>Welcome to LegendaryTube</Title>
      <Box p='xs'>
        <Flex
          mt={50}
          gap="xs"
          justify="flex-start"
          align="center"
          direction="row"
          wrap="wrap"
        >
          {(videos || []).map((video: video) => (
            <VideoTeaser key={video.videoId} video={video} />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default Home;