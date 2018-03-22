import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../service/post.model';
import { PostService } from '../service/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post = new Post;

  data: any;
  constructor(private postService: PostService, private toastr: ToastrService) { }

  ngOnInit() {

    this.postService.getPost().subscribe((data) => {

      this.data = data;
      console.log(data);
    })
  }
  onSubmit(form: NgForm) {

    if (form.value.id == null) {
      this.postService.postBlog(form.value).subscribe((data) => console.log(data));
      this.toastr.success("Post Added Successfully!!!", "Add Post");
    } else {
      this.postService.updatePost(form.value.id, form.value).subscribe(data =>{
        this.postService.getPost();
      });
      this.toastr.success("Post Updated Successfully!!", "Update Post");
    }

  }

  edit(post: Post) {
    this.post = post;
  }
  delete(id: number) {

    if (confirm("Are you sure want to delete this Post??") == true) {

        this.postService.deletePost(id)
        .subscribe(data=>{
          this.postService.getPost();
          this.toastr.warning("Deleted Post SuccessFully!!", "Delete Post");
        });

    }
  }
}
interface data {

  id: number,
  topic: string,
  description: string
}
