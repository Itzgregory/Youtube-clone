import { Box, Flex, Title } from "@mantine/core";
import { VideoTeaser } from "../../components/VideoTeaser/VideoTeaser";
import { subscription } from "../../interface/subscription/subscription";
import { useSubscription } from '../../context/subscription/subscriptions';

const Mysubs = () => {
    const { subscription, refetch } = useSubscription();
    
    console.log(subscription); 
    
    refetch();

    return (
        <>
            <Title mb="xl" align="center">Your Video Subscriptions</Title>
            <Box p="xs">
                <Flex
                    mt={50}
                    gap="xs"
                    justify="flex-start"
                    align="center"
                    direction="row"
                    wrap="wrap">
                    {(subscription || []).map((subscriptionItem: subscription) => {
                        console.log('Subscription Item:', subscriptionItem);
                        
                    
                        if (subscriptionItem && subscriptionItem.videoTo && subscriptionItem.videoTo.videoId) {
                            return (
                                <VideoTeaser
                                    key={subscriptionItem.videoTo.videoId}
                                    video={subscriptionItem.videoTo} 
                                />
                            );
                        } else {
                            console.error('Invalid subscription item:', subscriptionItem);
                            return null;
                        }
                    })}
                </Flex>
            </Box>
        </>
    );
};

export default Mysubs;
