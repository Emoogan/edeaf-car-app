<template>
  <v-card>
    <v-card-title color="primary" dark>Requests
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="requests"
      :loading="loading"
      :search="search"
      hide-actions
      class="elevation-2"
    >
      <v-progress-linear slot="progress" color="secondary" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.carName }}</td>
        <td>{{ props.item.personName }}</td>
        <td>{{ props.item.startTime }}</td>
        <td>{{props.item.finishTime }}</td>
        <td>{{ props.item.location }}</td>
        <td>{{props.item.reason }}</td>
        <td>
          <v-btn color="secondary">Approve</v-btn>
        </td>
        <td>
          <v-btn color="accent">Reject</v-btn>
        </td>
        <td>
          <v-btn color="secondary">Cancel</v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">There are currently no requests</v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Car', value: 'carName', align: 'center' },
        { text: 'Person', value: 'personName', align: 'center' },
        { text: 'From', value: 'startTime', align: 'center' },
        { text: 'To', value: 'finishTime', align: 'center' },
        { text: 'Location', value: 'location', align: 'center' },
        { text: 'Reason', value: 'reason', align: 'center' },
        { text: 'Approve', value: 'approve', align: 'center', sortable: false },
        { text: 'Reject', value: 'reject', align: 'center', sortable: false },
        { text: 'Cancel', value: 'cancel', align: 'center', sortable: false }
      ],
      requests: [
        {
          startTime: '2018-10-27T20:51:12.138Z',
          finishTime: '2018-10-27T20:51:12.138Z',
          location: 'that place',
          reason: 'that thing',
          carName: 'Vanilla',
          personName: 'That Guy',
          status: 'Pending'
        },
        {
          startTime: '2018-10-27T20:51:12.138Z',
          finishTime: '2018-10-27T20:51:12.138Z',
          location: 'places',
          reason: 'things',
          carName: 'Soccer Mom',
          personName: 'This guy',
          status: 'Pending'
        }
      ],
      loading: false,
      search: ''
    }
  }
}
</script>
