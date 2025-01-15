import { Box, Flex, Table } from "@mantine/core";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getVideosByUser } from "../../api/videos/videos";
import MyVideosTeaser from "../../components/MyVideos/MyVideos";
import { UserLoged } from "../../context";
import { video } from "../../interface";
import { QueryKeys } from "../../types";

const Myvideos = () => {
    const { user } = UserLoged();

    if (!user) {
        return <Box>User is not logged in</Box>;
    }

    const { data, refetch, isLoading, error } = useQuery<video[], AxiosError>({
        queryKey: [QueryKeys.videos, user?._id],
        queryFn: () => getVideosByUser(user?._id),
    });

    if (isLoading) {
        return <Box>Loading your videos...</Box>;
    }

    if (error) {
        return <Box>Error: {error.message}</Box>;
    }

    if (!data?.length) {
        return <Box>No videos found</Box>;
    }

    return (
        <Box p='xs'>
            <Flex
                gap="xs"
                justify="flex-start"
                align="center"
                direction='column'
                wrap="wrap">
                <Table align="center">
                    <thead>
                        <tr>
                            <th>Video</th>
                            <th>Published</th>
                            <th>Created Date</th>
                            <th>Update Date</th>
                            <th>Views</th>
                            <th>Likes</th>
                            <th>Comments</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(Array.isArray(data) ? data : []).map((video) => {
                            if (video) {
                                return <MyVideosTeaser key={video._id} video={video} refetch={refetch} />;
                            }
                            return null;
                        })}
                    </tbody>
                </Table>
            </Flex>
        </Box>
    );
};

export default Myvideos;
