import { Avatar, Box, Card, Flex, Image, Text } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { video } from '../../interface';
import Moment from 'react-moment';
import { updateVideoViews } from '../../api';

export const VideoTeaser = ({ video }: { video: video }) => {
  const [thumbnail, setThumbnail] = useState('');

  return (
    <Link href={`/watch/${video.videoId}`} passHref>
      <Flex
        direction="column"
        sx={() => ({
          '&:hover': {
            transform: 'scale(1.03)', 
            transition: 'transform 0.3s ease-in-out', 
          },
        })}
        onClick={() => updateVideoViews(video.videoId)}
      >
        <Image
          radius={15}
          src={thumbnail === '' ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/thumbnails/${video.thumbnailPath}` : thumbnail}
          height="11vw"
          width="20vw"
          alt="thumbnail video"
          onMouseEnter={() => setThumbnail(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/previews/${video.previewPath}`)}
          onMouseLeave={() => setThumbnail(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/thumbnails/${video.thumbnailPath}`)}
        />
        <Flex mt="md" direction="column">
          <Flex align="center" justify="start">
            <Avatar size="md" radius="xl" src={video.user.photo} />
            <Text weight={500} size="lg" ml="xl">
              {video.title}
            </Text>
          </Flex>
          <Flex direction="column" mt="xs" justify="center" align="start">
            <Text size="sm" color="dimmed">{video.user.displayName}</Text>
            <Flex align="center" justify="center">
              <Text mr={5} color="dimmed" size="xs">
                {video.views} views
              </Text>
              <Text mr={5} color="dimmed" size="lg">·</Text>
              <Text color="dimmed" size="xs"><Moment fromNow>{video.datePublished}</Moment></Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};
