const setId = (id) => {
  window.location.href=`blog-desc.html?id=${id}`;
}

$('a.nav-link').each(function() {
  $(this).click(function() {
    // console.log($(this).attr('id'));
    
    $('a.nav-link').removeClass('active');
    $(this).addClass('active');
    fetchData($(this).attr('id'));
  });
});

$(document).ready(function() {
  fetchData($('a.nav-link.active').attr('id'));
});

let fetchData = (display_type) => {
  $.ajax({
    url: 'http://localhost:5000/api/blog/all-blogs',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      // Sorting Array Date wise -Sudama [13-07-2020]
      let blogs_data = response.data.sort((a,b) => (new Date(b.blog_date)) - (new Date(a.blog_date)));
      if(display_type == "tips" || display_type == "newfromdevie") {
        blogs_data = blogs_data.filter((blog) => {
          const tagIndex = blog.blog_tag.findIndex((tag) => {
            return tag.text.split(' ').join('').toLowerCase().indexOf(display_type) !== -1
          });
          if(tagIndex >= 0) {
            return blog;
          }
        })
      }

      if(blogs_data.length > 0) {
        $('.blog_error').hide();

      if(display_type == "allstories") {

      let firstBlogCardData = blogs_data[0];
      let firstBlogCardDate =  new Date(firstBlogCardData.blog_date)
        .toLocaleDateString("en-IN", {month: "short", day: "2-digit"});
      let firstBlog = `
        <div class="card blog-card first-card mx-lg-auto mx-4" style="max-width: 1000px" data-aos="zoom-in" >
        <div class="row no-gutters" onClick="setId('${firstBlogCardData._id}')">
          <div class="col-md-7">
            <img src="${firstBlogCardData.blog_image}" class="card-img h-100 rounded-0" alt="blog_img">
          </div>
          <div class="col-md-5 d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title text-left-lg blog-title">${firstBlogCardData.blog_header}</h5>
              <h2 class="card-text multi-card-content">${firstBlogCardData.short_desc}</h2>
            </div>
            <div class="card-footer clearfix">
              <div class="footer-info float-left d-flex flex-row">
                <img src="assets/img/logo.png" class="blog-footer-info-img">
                <div class="blog-footer-info ml-2 d-flex flex-column justify-content-center">
                  <p class="card-text mb-0 text-muted">Devie</p>
                  <p class="card-text mb-0 text-muted">${firstBlogCardDate} - ${firstBlogCardData.blog_read_time} min read</p>
                </div>
              </div>
              <div class="blog-card-link float-right h-100 d-flex">
                <a onClick="setId('${firstBlogCardData._id}')" class="align-self-center">READ ARTICLE&nbsp;&nbsp;<i class="icofont-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
        </div>`;

        $('.blog-single-top-card').html(firstBlog).show();

        blogs_data.splice(0,1);
      } else {
        $('.blog-single-top-card').hide();
      }
      // Making an array of all blog card -Sudama [13-07-2020]
      let displayCard = $.map(blogs_data, function(blog, index) {
       let blogDate = new Date(blog.blog_date)
        .toLocaleDateString(
          "en-IN", {
          month: "short",
          day: "2-digit"
          }
        );

      let blogData = `
        <div class="card blog-card" data-aos="zoom-in" onClick="setId('${blog._id}')">
          <img src="${blog.blog_image}" class="card-img-top rounded-0" alt="blog_image">
          <div class="card-body">
            <h5 class="card-title blog-title">${blog.blog_header}</h5>
            <p class="card-text blog-short-desc">${blog.short_desc}</p>
          </div>
          <div class="card-footer small-card-footer clearfix">
            <div class="footer-info float-left d-flex flex-row">
              <img src="assets/img/logo.png" class="blog-footer-info-img">
              <div class="blog-footer-info ml-2 d-flex flex-column justify-content-center">
                <p class="card-text mb-0 text-muted">Devie</p>
                <p class="card-text date mb-0 text-muted">${blogDate} - ${blog.blog_read_time} min read</p>
              </div>
            </div>
            <div class="blog-card-link float-right h-100 d-flex">
              <a class="align-self-center">READ ARTICLE&nbsp;&nbsp;<i class="icofont-arrow-right"></i></a>
            </div>
          </div>
        </div>`;
        return blogData;
      })
      $('.blog-multiple-card-container').html(displayCard.join("")).show();
      } else {
        $('.blog-multiple-card-container').hide();
        $('.blog-single-top-card').hide();
        $('.blog-card').hide();
        $('.blog_error').html("<h4 class='noBlogFound'>No Blogs Found</h4>").show();
      }
    },
    error: function(response) {
      $('.blog-multiple-card-container').hide();
      $('.blog-single-top-card').hide();
      $('.blog-card').hide();
      $('.blog_error').html("<h4 class='noBlogFound'>No Blogs Found</h4>").show();
    }
  })
}