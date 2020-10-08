<template>
  <div class="ml-16 mr-16 mt-16 mb-16">
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="isLoading"
      item-key="name"
      show-expand
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      class="elevation-3"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="font-size: 30px; color: grey"
            >Appointments</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider
          ><v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
          </template>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2 ml-2 mt-2"
                v-bind="attrs"
                v-on="on"
                height="47"
              >
                New Appointment
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Phone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.website"
                        label="Website"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem['address'].street"
                        label="Street"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem['address'].suite"
                        label="Suite"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem['address'].city"
                        label="City"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem['address'].zipcode"
                        label="Zip Code"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.id="{ item }">
        <td style="font-size: 18px">{{ item.id }}</td>
      </template>
      <template v-slot:item.name="{ item }">
        <td style="font-size: 18px">{{ item.name }}</td>
      </template>
      <template v-slot:item.email="{ item }">
        <td style="font-size: 18px">{{ item.email }}</td>
      </template>
      <template v-slot:item.phone="{ item }">
        <td style="font-size: 18px">{{ item.phone }}</td>
      </template>
      <template v-slot:item.website="{ item }">
        <td style="font-size: 18px">
          <a :href="item.website">{{ item.website }}</a>
        </td>
      </template>
      <template v-slot:item.actions="{ item }">
        <!-- <v-icon
        small
        class="mr-2"
        color="primary"
        fab
        dark
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon> -->

        <v-icon color="success" class="mr-3" @click="editItem(item)"
          >mdi-pencil</v-icon
        >
        <v-icon color="error" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-container>
            <v-row justify-md="center">
              <v-col md="6">
                <v-card class="p-5">
                  <v-card-title style="font-size: 25px"
                    >Other Details</v-card-title
                  >
                  <hr />
                  <v-card-text>
                    <p style="font-size: 20px">
                      <b>Suite</b> : {{ item["address"].suite }}
                    </p>
                    <p style="font-size: 20px">
                      <b>City</b> : {{ item["address"].city }}
                    </p>
                    <p style="font-size: 20px">
                      <b>Street</b> : {{ item["address"].street }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <!-- <v-container>
            <v-row>
              <v-card class="p-3">
              <v-col md="6">
                  <v-card-title>Email : </v-card-title> 
                  {{ item.email }}
              </v-col>
              <v-col md="6">
                  <v-card-title>Address : </v-card-title> {{ item['address'].street }}
              </v-col>
              </v-card>
            </v-row>
          </v-container> -->
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <v-snackbar :color="color" timeout="3000" v-model="snackbar">{{
      message
    }}</v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",

  created() {
    this.initialize();
  },
  data: () => ({
    snackbar: false,
    dialog: false,
    expanded: [],
    isLoading: true,
    search: "",
    color: "",
    message: "",
    sortDesc: false,
    singleExpand: false,
    sortBy: "id",
    dialogDelete: false,
    // keys: ["Name", "Calories", "Fat", "Carbs", "Protein"],
    keys: ["Name", "Id"],
    headers: [
      {
        text: "Id",
        value: "id",
      },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Phone", value: "phone" },
      { text: "Webiste", value: "website" },
      { text: "Actions", value: "actions" },
      // { text: "Name", value: "name",  },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      phone: 0,
      website: "",
      address: {},
    },
    defaultItem: {
      name: "",
      email: "",
      phone: 0,
      website: "",
      address: {},
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    initialize() {
      this.isLoading = true;
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          if (response.data) {
            this.snackbar = true;
            this.color = "success";
            this.message = "Data Loaded Successfully...";
            this.isLoading = false;
            this.users = response.data;
          } else {
            this.snackbar = true;
            this.color = "error";
            this.message = "No User Found";
            this.users = [];
            this.isLoading = false;
          }
        })
        .catch((error) => {});
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
