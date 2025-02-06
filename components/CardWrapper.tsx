import {
    Card,
} from "@/components/ui/card"

import React, {Children} from 'react';

const CardWrapper = ({children, width}) => {
    return (
        <Card className={width}>
            {children}
        </Card>

    );
};

export default CardWrapper;