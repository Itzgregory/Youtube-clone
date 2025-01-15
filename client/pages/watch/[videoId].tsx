import { Avatar, Box, Flex, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import Moment from 'react-moment';
import { UserLoged } from '../../context';
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { getVideoPropertys } from "../../api";
import { QueryKeys } from "../../types";
import { video } from "../../interface";
import Comments from "../../components/Comments/comments";
import Subscribeme from "../../components/Subscribme/Subscribeme";
import LikeVideo from "../../components/LikeVideo/LikeVideo";

const WatchVideoPage = () => {
    const { query: { videoId } } = useRouter();
    const { data, refetch } = useQuery<video, AxiosError>({
        queryKey: [QueryKeys.videos, videoId],
        queryFn: async () => await getVideoPropertys(videoId),
    });
    const { user } = UserLoged();

    // Log data to inspect its structure
    console.log(data);

    return (
        <>
            {data ? (
                <>
                    {/* Check if video data exists and is properly structured */}
                    <Box>
                        <video
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/video/watch/${videoId}`}
                            style={{ width: '60vw', height: '30vw', border: '1px solid', boxShadow: '2px 2px 5px black' }}
                            controls
                            autoPlay
                            id="video-player"
                        />
                    </Box>
                    <Box>
                        <Title>{data.title}</Title>
                        <Flex mt='md' align='center'>
                            <Avatar src={data.user.photo} radius="xl" size='md' mr='md' />
                            <Flex direction='column'>
                                <Text transform="none">{data.user.displayName}</Text>
                                <Text>Subscribers</Text>
                            </Flex>
                            <Subscribeme user={user} videoId={videoId} data={data} />
                            <LikeVideo user={user} data={data} refetch={refetch} videoId={videoId} />
                        </Flex>
                    </Box>
                    <Box mt='xl' p='xs'>
                        <Text weight={700}>Published: <Moment fromNow>{data.datePublished}</Moment></Text>
                        <Text>{data.description}</Text>
                    </Box>
                    <Comments postId={data._id} />
                </>
            ) : null}
        </>
    );
};

export default WatchVideoPage;
