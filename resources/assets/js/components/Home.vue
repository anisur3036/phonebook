<template>
	<div>
		<nav class="panel column is-offset-2 is-8">
		  <p class="panel-heading">
		  Vuejs Phonebook
		    <button class="button is-primary is-outlined" @click="openAddNew">
		      Add New
		    </button>
		    <span class="is-pulled-right" v-if="loading">
		    	<i class="fa fa-refresh fa-spin fa-1x fa-fw"></i>
		    </span>
		  </p>
		  <div class="panel-block">
		    <p class="control has-icons-left">
		      <input class="input is-small" type="text" placeholder="search">
		      <span class="icon is-small is-left">
		        <i class="fa fa-search"></i>
		      </span>
		    </p>
		  </div>
		  <a class="panel-block" v-for="item, key in lists">
		    <span class="column is-9">
		    	{{ item.name }}
		    </span>
		    <span class="panel-icon column is-1">
		      <i class="has-text-danger fa fa-trash" aria-hidden="true" @click="del(key, item.id)"></i>
		    </span>
		    <span class="panel-icon column is-1">
		      <i class="has-text-info fa fa-edit" aria-hidden="true" @click="updateDitail(key)"></i>
		    </span>
		    <span class="panel-icon column is-1">
		      <i class="has-text-primary fa fa-eye" aria-hidden="true" @click="openEye(key)"></i>
		    </span>
		  </a>
		</nav>

		<Add :openmodal='addActive' @closeRequest='close'></Add>
		<Show :openmodal='showActive' @closeRequest='close'></Show>
		<Edit :openmodal='showUpdate' @closeRequest='close'></Edit>
	</div>
</template>
<script>
let Add = require('./Add.vue');
let Show = require('./Show.vue');
let Edit = require('./Edit.vue');
	export default{
		components: {Add, Show, Edit},
		data() {
			return {
				addActive: '',
				showActive: '',
				showUpdate: '',
				lists: {},
				errors: {},
				loading: false
			}
		},
		mounted() {
			axios.post('/getData')
			.then((response) => this.lists = response.data)
			.catch((error) => this.errors = error.response.data.errors);
			console.log('working');
		},
		methods: {
			openAddNew() {
				this.addActive = 'is-active';
				this.$data.list = ''
			},
			openEye(key) {
				this.$children[1].list = this.lists[key];
				this.showActive= 'is-active'
			},
			updateDitail(key) {
				this.$children[2].list = this.lists[key];
				this.showUpdate= 'is-active'
			},
			close() {
				this.addActive = this.showActive = this.showUpdate = ''
			}, 
			del(key, id) {
				if (confirm("Are you sure ?")) {
					this.loading = !this.loading;
					
					axios.delete(`/phonebook/${id}`)
					.then((response) => {
						this.lists.splice(key, 1);
						this.loading = !this.loading
					})
					.catch((error) => this.errors = error.response.data.errors);
				}
			}
		}
	}
</script>
