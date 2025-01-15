import { Button, Popover, Text } from '@mantine/core';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { BellRinging } from 'tabler-icons-react';
import { setSubscription } from '../../api';
import { useSubscription } from '../../context';
import { User, video } from '../../interface';

const Subscribme = ({ user, data, videoId }: { data: video | undefined, user: User | null, videoId: string | string[] | undefined }) => {
  const { subscription = [], refetch } = useSubscription(); 
  const videoSubscribed = subscription.some((subscription) => subscription.videoTo?.videoId === videoId);
  const [subState, setsubState] = useState(videoSubscribed);

  const subscribme = useMutation<object, AxiosError, Parameters<typeof setSubscription>['0']>(setSubscription, {
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <>
      {user ? (
        subState ? (
          <Button ml="xl" radius="xl" leftIcon={<BellRinging size={14} />} size="xs" variant="light" color="dark" onClick={() => (subscribme.mutate({ data, user }), setsubState(!subState))}>
            Subscribed
          </Button>
        ) : (
          <Button ml="xl" radius="xl" size="xs" onClick={() => (subscribme.mutate({ data, user }), setsubState(!subState))}>
            Subscribe me
          </Button>
        )
      ) : (
        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button ml="xl" radius="xl" size="xs">
              Subscribe me
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="sm">You must be logged in to subscribe</Text>
          </Popover.Dropdown>
        </Popover>
      )}
    </>
  );
};

export default Subscribme;
