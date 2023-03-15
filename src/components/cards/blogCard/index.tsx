import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

interface BlogCardProps {
    image: string
    title: string
    date: string
}
const BlogCard: React.FC<BlogCardProps> = ({ image, title, date }) => {
    return (
        <Card sx={{ width: '100%', height: '100%', margin: '0 auto' }}>
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {date}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BlogCard
