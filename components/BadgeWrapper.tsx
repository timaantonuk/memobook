import React, { ReactNode } from 'react';
import { Badge } from "@/components/ui/badge";

interface BadgeWrapperProps {
    children: ReactNode;
}

const BadgeWrapper: React.FC<BadgeWrapperProps> = ({ children }) => {
    return (
        <Badge className="rounded-full">
            {children}
        </Badge>
    );
};

export default BadgeWrapper;
