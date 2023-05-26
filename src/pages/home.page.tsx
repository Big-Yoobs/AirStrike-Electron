import styles from "../styles/home.page.module.scss";

export default function HomePage() {
    return (
        <div className={styles.container}>
            <h1>home page</h1>
            <p>Welcome to our dummpy app
                Lorem ipsum dolor
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, odio voluptatem. Aut tempora incidunt beatae, in quo quam natus ad libero quos explicabo totam delectus velit nobis cum, cumque sed dolor neque amet, ipsa enim sit ut? Nobis ut maiores voluptatum distinctio ad libero, tempore veritatis animi sit minima reprehenderit.
            </p>
            <span className="underline">this should be underlined</span>
        </div>

    )
}