<?php 
   /*
   Template Name: education
   */
   
   get_header(); 
   
   get_template_part('hero')
   
   
   ?>

<main>
   <section class="links">
      <h3 style="text-align: center; font-weight: bold;"><?php the_field('select_course')?></h3>

      <div class="edu-links-flex">
        <img class="edu-classes-img" src="<?php echo get_template_directory_uri() . '/dist/img/four.jpg'?>" width="400" alt="">
        <div class="course-links-container">
            <h4 class="course-links"><a href="#instruction"><?php the_field('course_links_1')?></a></h4>
            <h4 class="course-links"><a href="#arts"><?php the_field('course_links_2')?></a></h4>
            <h4 class="course-links"><a href="#summer"><?php the_field('course_links_3')?></a></h4>
            <h4 class="course-links"><a href="<?php the_field('school_link')?>"><?php the_field('course_links_4')?></a></h4>
            <h4 class="course-links"><a href="#d2"><?php the_field('course_links_5')?></a></h4>
            <h4 class="course-links"><a href="#d3"><?php the_field('course_links_6')?></a></h4>
        </div>
    </div>
   </section>

   <section class="intro">
      <p><?php the_field('education_intro')?></p>
   </section>

   <div id="swirl-container">
      <img src="<?php echo get_template_directory_uri() . '/dist/img/swirl.png'?>" alt="swirl">
   </div>

   <section class="classes">
      <div class="classes-container">
         <h3 id="instruction">Instruction and Training Program</h3>
         <div class="inside-class-container">
         <p class="class-desc"><?php the_field('instruction_paragraph')?></p>
         <img src="<?php the_field('edu-img1')?>" alt="" style=>
</div>
      </div>

      <div class="classes-container">
        <h3 id="arts">Arts in Education and Community</h3>
        <div class="inside-class-container">
        <img src="<?php the_field('edu-img2')?>" alt="" >
         <p class="class-desc"><?php the_field('arts_paragraph')?></p>
</div>
      </div>

      <div class="classes-container">
         <h3 id="summer">Summer Training Program</h3>
         <div class="inside-class-container">
         <p class="class-desc"><?php the_field('summer_paragraph')?></p>
         <img src="<?php the_field('edu-img3')?>" alt="">
         
</div>
      </div>

      <div class="classes-container">
        <h3 id="d2">D/2 Apprentice Company</h3>
        <div class="inside-class-container">
        <img src="<?php the_field('edu-img4')?>" alt="" >
         <p class="class-desc"><?php the_field('d2_paragraph')?></p>
</div>
      </div>

      <div class="classes-container">
         <h3 id="d3">D/3 Youth Ensemble</h3>
         <div class="inside-class-container">
         <p class="class-desc"><?php the_field('d3_paragraph')?></p>
         <img src="<?php the_field('edu-img5')?>" alt="">
      </div>
</div>
   </section>
</main>

<?php get_footer();?>