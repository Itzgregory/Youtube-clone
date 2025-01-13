import { Box, Flex, Title } from "@mantine/core"
import { VideoTeaser } from "../../components"
import { subscription } from "../../interface"
import { useSubscription } from '../../context'


const Mysubs = () => {
    const { subscription, refetch } = useSubscription()
    refetch()
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
                    wrap="wrap"> {
                        (subscription || []).map((subscription: subscription) => {
                            return <VideoTeaser key={subscription.videoTo.videoId} video={subscription.videoTo} />
                        })
                    }</Flex>
            </Box>
        </>
    )
}


export default Mysubs