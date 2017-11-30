<template>
  <div class="recent-list">
    <div class="card-wrapper">
      <div class="card" v-for="(recent, index) in RecentList" v-bind:class="{'no-data': !recent.dayExists && !getTempByIndex(index) }">
        <div class="data" v-if="recent.dayExists == true && recent.dayType != '' && recent.activeLevel != ''">
          <div class="face">
            <i v-if="recent.dayType == 'Good'" class="fa fa-smile-o" aria-hidden="true"></i>
            <i v-if="recent.dayType == 'Okay'" class="fa fa-meh-o" aria-hidden="true"></i>
            <i v-if="recent.dayType == 'Mig'" class="fa fa-frown-o" aria-hidden="true"></i>
          </div>
          <div class="content">
            <div class="date">{{parseDate(recent.date)}}</div>
            <div class="activeLevel" v-bind:class="recent.activeLevel">{{parseShortActiveLevel(recent.activeLevel)}}</div>
            <div class="treatments">
              <ul>
                <li v-for="treatment in recent.treatment">{{treatment}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="no-data" v-if="recent.dayExists == false" v-on:click="setActiveMode(recent,index)">
          <div v-if="!getTempByIndex(index)"><i class="fa fa-question-circle" aria-hidden="true"></i>How was your {{parseDate(recent.date)}}?</div>
          <div class="edit" v-if="getTempByIndex(index)">
            <h3>How was {{parseDate(getTempByIndex(index).recent.date)}}?</h3>
            <div class="selects-icons faces">
                <div v-on:click="getTempByIndex(index).recent.dayType = 'Good'"><i v-bind:class="{'active': getTempByIndex(index).recent.dayType =='Good' || !getTempByIndex(index).recent.dayType}" class="fa fa-smile-o" aria-hidden="true"></i><span>GOOD</span></div>
                <div v-on:click="getTempByIndex(index).recent.dayType = 'Okay'"><i v-bind:class="{'active': getTempByIndex(index).recent.dayType =='Okay' || !getTempByIndex(index).recent.dayType}" class="fa fa-meh-o" aria-hidden="true"></i><span>OKAY</span></div>
                <div v-on:click="getTempByIndex(index).recent.dayType = 'Mig'"><i v-bind:class="{'active': getTempByIndex(index).recent.dayType =='Mig' || !getTempByIndex(index).recent.dayType}" class="fa fa-frown-o" aria-hidden="true"></i><span>BAD</span></div>
            </div>
            <div v-if="getTempByIndex(index).recent.dayType" class="edit-rest">
                  <h4>Where your activities affected?</h4>
                  <div class="selects-icons batteries">
                      <div v-on:click="getTempByIndex(index).recent.activeLevel = 'Full'"><i v-bind:class="{'active': getTempByIndex(index).recent.activeLevel =='Full' || !getTempByIndex(index).recent.activeLevel}" class="fa fa-battery-full" aria-hidden="true"></i><span>NO</span></div>
                      <div v-on:click="getTempByIndex(index).recent.activeLevel = 'Half'"><i v-bind:class="{'active': getTempByIndex(index).recent.activeLevel =='Half' || !getTempByIndex(index).recent.activeLevel}" class="fa fa-battery-half" aria-hidden="true"></i><span>SLOWED DOWN</span></div>
                      <div v-on:click="getTempByIndex(index).recent.activeLevel = 'None'"><i v-bind:class="{'active': getTempByIndex(index).recent.activeLevel =='None' || !getTempByIndex(index).recent.activeLevel}" class="fa fa-battery-empty" aria-hidden="true"></i><span>MISSED ACTIVITIES</span></div>
                  </div>
                  <div class="treatments">
                    <h4>Treatments Used?</h4>
                    <ul>
                      <li v-for="treatment in treatmentsSettings" v-on:click="toggleActiveTreatment(index,treatment)" v-bind:class="{'active': getTempByIndex(index).recent.treatment.includes(treatment.name)}" v-if="showAll==false ? treatment.status==true : true">{{treatment.name}}</li>
                    </ul>
                    <div v-on:click="showAll=true" v-if="showAll==false">Show All...</div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recent',
  data () {
    return {
      msg: 'Recent tab',
      recentTemp: [],
      showAll: false
    }
  },
  computed: {
    RecentList(){
      return this.$store.getters.recentTabResponse
    },
    treatmentsSettings(){
      return this.$store.getters.settingsTabResponse
    }
  },
  methods : {
    parseDate (datestring) {
    var d = new Date(datestring)
    var weekDay = d.toLocaleString('en-us', { weekday: "long" });
    var currDate = d.getDate()
    var currMonth = d.toLocaleString('en-us', { month: "long" });
    return ( weekDay + ', ' + currMonth + ' ' + currDate)
    },
    parseShortActiveLevel (activeLevel) {
      switch (activeLevel) {
        case 'Full':
          return 'Active'
          break;
        case 'Half':
          return 'Slower'
          break;
        case 'None':
          return 'Missed'
          break;
        default:
          return "";
      }
    },
    clone(obj) {
      if (null == obj || "object" != typeof obj) return obj;

      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }

      return copy;
    },
    setActiveMode(recent,index){
      let temp = {
        index: index,
        recent: this.clone(recent)
      }
      temp.recent.dayExists = true
      this.recentTemp.push(temp)
    },
    getTempByIndex(index) {
      return this.recentTemp.filter(
          function(data){ return data.index == index }
      )[0]
    },
    toggleActiveTreatment(index, treatment){
      let recentOb = this.getTempByIndex(index).recent

      let isPresent = recentOb.treatment.includes(treatment.name)
      !isPresent ? recentOb.treatment.push(treatment.name) : recentOb.treatment.splice(recentOb.treatment.indexOf(treatment.name) , 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'Recent.scss';
</style>
