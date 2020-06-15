<template>
  <v-app>    
      <navBar/>    
   <v-content>
     <v-container grid-list-md>
             <router-view></router-view>
     </v-container>
    </v-content>
  </v-app>
</template>
<script src='./App.ts' lang='ts'/>
