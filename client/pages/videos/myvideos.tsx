import { Box, Flex, Table } from "@mantine/core";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getVideosByuser } from "../../api";
import MyVideosTeaser from "../../components/MyVideos/MyVideos";
import { UserLoged } from "../../context";
import { video } from "../../interface";
import { QueryKeys } from "../../types";

const Myvideos = () => {
    const { user } = UserLoged();
    
    const { data, refetch } = useQuery<video[], AxiosError>({
        queryKey: [QueryKeys.videos, user._id],
        queryFn: () => getVideosByuser(user._id),
    });

    // Log data to check its structure
    console.log(data);

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
                        {(data || []).map((video: video) => {
                            // Log each video to ensure it's a valid object
                            console.log(video);
                            if (video) {
                                return <MyVideosTeaser key={video._id} video={video} refetch={refetch} />;
                            } else {
                                return null; // Handle missing video gracefully
                            }
                        })}
                    </tbody>
                </Table>
            </Flex>
        </Box>
    );
};

export default Myvideos;
