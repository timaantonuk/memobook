import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const TopNavigation = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>

                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink href="/create">Create</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink href="/learn">Learn</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink href="/faq">FAQ</BreadcrumbLink>
                </BreadcrumbItem>

            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default TopNavigation
