import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInput, setBlogData } from '../../redux/features/userSlice';

// style
import styles from './Blogs.module.css';

const Blogs = () => {

    const searchInput = useSelector(selectUserInput)
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=716853edba3e7302a965f1f6259a2d31`

    const dispatch = useDispatch()

    const [blogs, setBlogs] = useState()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(blog_url)
        .then((res) => {
            dispatch(setBlogData(res.data))
            setBlogs(res.data)
            setLoading(false)
        })
        .catch((error) => console.log(error))
    }, [searchInput])

    return (
        <div className={styles.blogPage}>
            <h1 className={styles.blogPageHeader}>Blogs</h1>
            {loading ? <h1 className={styles.loading}>Loading...</h1> : ""}
            <div className={styles.blogs}>
                {blogs?.articles?.map(blog => (
                    <a className={styles.blog} target="_blank" href={blog.url}>
                        <img src={blog.image} />
                        <div>
                            <h3 className={styles.sourceName}>
                                <span>{blog.source.name}</span>
                                <p>{blog.publishedAt}</p>
                            </h3>
                            <h1>{blog.title}</h1>
                            <p>{blog.description}</p>
                        </div>
                    </a>
                ))}

                {blogs?.totalArticles == 0 && (
                    <h1 className={styles.noBlogs}>
                        No blogs available. Search something else to read blogs.
                    </h1>
                )}
            </div>
        </div>
    )
}

export default Blogs
