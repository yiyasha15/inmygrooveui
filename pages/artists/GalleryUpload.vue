<template>
    <main>
        <div class = "col-md-4">
            <form @submit.prevent="submit">
              <div class = "form-group">
                  <label for>Who are you ?</label>
                  <input type="text" class="form-control" v-model="gallery.g_artist">
              </div>
              <div class = "form-group">
                  <label for>Photo</label>
                  <input type="file" name = "g_upload_photo" @change = "onFileChange">
              </div>
              
              
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    data(){
        return {
            gallery: {
               g_artist: "",
               g_upload_photo: ""
           },
        }
    },
    methods: {
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }
            this.gallery.g_upload_photo = files[0];
            this.createImage(files[0]);
        },
        createImage(file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
        },
        async submit() {
            const config = {
                headers: {"content-type": "multipart/form-data"}
            };
            let formData = new FormData();
            for (let data in this.gallery) {
                formData.append(data, this.gallery[data]);
            }
            try {
                let response = await this.$axios.$post("/v1/gallery/", formData, config);
                this.$router.push("/");
            } catch (e) {
                console.log(e);
            }
        }        
    }
}

</script>
