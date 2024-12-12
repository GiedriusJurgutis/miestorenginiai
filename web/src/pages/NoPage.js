import '../css/styles.css';

const NoPage = () => {
    return (
        <section className="page-section bg-primary text-white mb-0 " id="nopages">

            <h2 className="page-section-heading text-center text-uppercase text-white">404</h2>

            <div className="divider-custom divider-light">
                <div className="divider-custom-line"></div>
                <div className="divider-custom-icon"><i class="fas fa-star"></i></div>
                <div className="divider-custom-line"></div>
            </div>

            <div className="mx-auto  text-center"><p>Page not found.</p></div>
        </section>
    );
};

export default NoPage;