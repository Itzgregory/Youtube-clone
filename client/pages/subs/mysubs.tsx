import { Box, Flex, Title } from "@mantine/core";
import { VideoTeaser } from "../../components";
import { subscription } from "../../interface";
import { useSubscription } from '../../context';

const Mysubs = () => {
    const { subscription, refetch } = useSubscription();
    
    console.log(subscription);
    
    refetch();

    return (
        <>
            <Title mb='xl' align="center">Your Video Subscriptions</Title>
            <Box p='xs'>
                <Flex
                    mt={50}
                    gap="xs"
                    justify="flex-start"
                    align="center"
                    direction="row"
                    wrap="wrap">
                    {(subscription || []).map((subscriptionItem: subscription) => {
                        console.log(subscriptionItem);
                        if (subscriptionItem && subscriptionItem.videoTo) {
                            return <VideoTeaser key={subscriptionItem.videoTo.videoId} video={subscriptionItem.videoTo} />;
                        } else {
                            return null;
                        }
                    })}
                </Flex>
            </Box>
        </>
    );
};

export default Mysubs;
