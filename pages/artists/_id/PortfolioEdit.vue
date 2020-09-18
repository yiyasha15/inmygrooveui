
<template>
    <main>
        <div class = "col-md-4">
            <form @submit.prevent="submit">
              <div class = "form-group">
                  <label for>Name</label>
                  <input type="text" class="form-control" v-model="receipe.artist_name">
              </div>
              <div class = "form-group">
                  <label for>Country</label>
                  <input type="text" class="form-control" v-model="receipe.country">
              </div>
              <div class = "form-group">
                  <label for>Upload image</label>
                  <input type="file" name = "artist_image" @change = "onFileChange">
              </div>
              <div class = "form-group">
                  <label for>Style</label>
                  <input type="text" class="form-control" v-model="receipe.style">
              </div>
              <div class = "form-group">
                  <label for>Introduction</label>
                  <input type="text" class="form-control" v-model="receipe.bio">
              </div>
              <div class = "form-group">
                  <label for>Biography</label>
                  <input type="text" class="form-control" v-model="receipe.biography">
              </div>
              
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </main>
</template>
<script>

export default {
    head(){
        return {
            title: "Edit Portfolio"
        }
    },
    async asyncData({ $axios, params}) {
        try {
            let receipe = await $$axios.$get(`/v1/portfolio/${params.id}`);
            return { receipe };
        } catch(e) {
            return { receipe: []};
        }
    },
    data() {
        return {
            receipe: {
               artist_name: "",
               country: "",
               style: "",
               artist_image: "",
               bio: "",
               biography: ""
           },
        }
    },
    methods: {
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }
            this.receipe.artist_image=files[0]
            this.createImage(files[0]);
        },
        createImage(file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
        },
        async submit() {
            let editedReceipe = this.receipe
            if (editReceipe.artist_image.indexOf("http://") != -1){
                delete editedReceipe['artist_image']
            }
            const config = {
                headers: {"content-type": "multipart/form-data"}
            };
            let formData = new FormData();
            for (let data in editedReceipe) {
                formData.append(data, editedReceipe[data]);
            }
            try {
                let response = await this.$axios.$patch("/v1/portfolio/${editedReceipe.id}/", formData, config);
                this.$router.push("/");
            } catch (e) {
                console.log(e);
            }
        }
    }
}
</script>