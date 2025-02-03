import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
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