import "../../assets/css/About/PageTitle.css"; // Thay bằng đường dẫn đến file CSS của bạn

function PageTitle(props) {
  return (
    <div className="page-title" data-aos="fade">
      <div className="heading">
        <div className="container">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-lg-8">
              <h1>
                {props.title}
                <br />
              </h1>
              <p className="mb-0">
                Hate and where they are soothed. They never abandon exercise.
                Offices which hatred are pleasures follow as from hatred
                pleasure. Let pains debts truth born pains. As if by reason they
                are. Let seek pain itself.
              </p>
            </div>
          </div>
        </div>
      </div>
      <nav className="breadcrumbs"></nav>
    </div>
  );
}

export default PageTitle;
