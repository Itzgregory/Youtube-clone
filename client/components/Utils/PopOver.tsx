import { Button, Popover, Text } from '@mantine/core';
import React from 'react';

const PopOver = () => {
    return (
        <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
                <Button>Toggle popover</Button>
            </Popover.Target>
            <Popover.Dropdown>
                <Text size="sm">This is an uncontrolled popover; it is opened when the button is clicked</Text>
            </Popover.Dropdown>
        </Popover>
    );
};

export default PopOver;
