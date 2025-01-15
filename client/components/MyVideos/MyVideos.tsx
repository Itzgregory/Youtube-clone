import { Image, Switch, ActionIcon, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { video } from '../../interface';
import { Trash } from 'tabler-icons-react';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { deleteVideoById, getComment, updatePublishedVideo } from '../../api';
import { showNotification, updateNotification } from '@mantine/notifications';
import Moment from 'react-moment';
import Link from 'next/link';
import { QueryKeys } from '../../types';

const MyVideosTeaser = ({ video, refetch }: { video: video, refetch: any }) => {
  const [thumbnail, setThumbnail] = useState('');
  const { data } = useQuery({
    queryKey: [QueryKeys.comments, video.videoId],
    queryFn: () => getComment(video._id),
  });

  const deleteVideo = useMutation<object, AxiosError, Parameters<typeof deleteVideoById>['0']>(deleteVideoById, {
    onMutate: () => {
      showNotification({
        id: 'deleteVideo',
        title: 'deleting video',
        message: 'Please wait...',
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: 'deleteVideo',
        title: 'Success',
        message: 'Video Deleted Successfully',
      });
      refetch();
    },
    onError: () => {
      updateNotification({
        id: 'deleteVideo',
        title: 'Error',
        message: 'An error occurred when trying to delete the video',
      });
    },
  });

  const updatePublished = useMutation<video, AxiosError, Parameters<typeof updatePublishedVideo>['0']>(updatePublishedVideo, {
    onSuccess: () => {
      refetch();
    },
  });

  const rows = (
    <>
      {data ? (
        <tr>
          <td>
            <Link href={`${process.env.NEXT_PUBLIC_CLIENT_BASEPATH}/watch/${video.videoId}`}>
              <Image
                radius={15}
                src={thumbnail === '' ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/thumbnails/${video.thumbnailPath}` : thumbnail}
                height={'8vw'}
                width={'14vw'}
                alt="thumbnail video"
                onMouseEnter={() => setThumbnail(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/previews/${video.previewPath}`)}
                onMouseLeave={() => setThumbnail(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/thumbnails/${video.thumbnailPath}`)}
              />
            </Link>
          </td>
          <td>
            <Switch
              defaultChecked={video.published}
              onChange={() => updatePublished.mutate({ videoId: video.videoId, published: video.published })}
            />
          </td>
          <td><Moment fromNow>{video.createdAt}</Moment></td>
          <td><Moment fromNow>{video.updatedAt}</Moment></td>
          <td>{video.views}</td>
          <td>{video.likeId.length}</td>
          <td>{data.length}</td>
          <td>
            <ActionIcon variant="filled" color="blue" onClick={() => deleteVideo.mutate(video._id)}>
              <Trash size={20} />
            </ActionIcon>
          </td>
        </tr>
      ) : null}
    </>
  );

  return <tbody>{rows}</tbody>;
};

export default MyVideosTeaser;
