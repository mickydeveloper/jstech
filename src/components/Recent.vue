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
            <div class="faces-select">
                <div v-on:click="getTempByIndex(index).recent.dayType = 'Good'"><i class="fa fa-smile-o" aria-hidden="true"></i><span>GOOD</span></div>
                <div v-on:click="getTempByIndex(index).recent.dayType = 'Okay'"><i class="fa fa-meh-o" aria-hidden="true"></i><span>OKAY</span></div>
                <div v-on:click="getTempByIndex(index).recent.dayType = 'Mig'"><i class="fa fa-frown-o" aria-hidden="true"></i><span>BAD</span></div>
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
      recentTemp: []
    }
  },
  computed: {
    RecentList(){
      return this.$store.getters.recentTabResponse
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .card{
    background: $card-bg;
    border-radius: 8px;
    padding: 1.2rem;
    margin-bottom: 0.8rem;

    &.no-data{
      opacity: 0.7;
      font-weight: 300;
      font-size: 0.9rem;

      i{
        font-size: 1.3rem;
        margin-right: 0.5rem;
      }
    }

    .data, .no-data, .edit, .faces-select{
      display: flex;
    }

    .no-data{
      .edit{
        width: 100%;
        flex-direction: column;
        h3{
          text-align: center;
          margin: 0 0 0.5rem;
          width: 100%;
        }

        .faces-select{
          div {
           display: inline-block;
           width: 33%;
           text-align: center;
           i{
             display: block;

             font-size: 3.5rem;

             @include respond-to(small-up){
               font-size: 5.5rem;
             }
           }
         }
        }
      }
    }

    i{
      &.fa-smile-o, &.fa-smile-o + span{
        color: $blue;
      }
      &.fa-meh-o, &.fa-meh-o + span{
        color: $yellow;
      }
      &.fa-frown-o , &.fa-frown-o + span{
        color: $orange;
      }
    }

    .face{
      display: inline-block;
      width: 20%;
      text-align: center;
      i{
        font-size: 3.5rem;

        @include respond-to(small-up){
          font-size: 5.5rem;
        }
      }
    }

    .content{
      display: inline-block;
      width: 80%;
      padding-left: 0.5rem;
      padding-right: 0.5rem;

      .date{
        font-weight: 300;
      }

      .activeLevel{
        text-align: center;
        border-radius: 6px;
        padding: 0.4rem;
        margin-top: 0.3rem;
        margin-bottom: 0.2rem;
        font-size: 0.9rem;
        font-weight: 500;

        &.Full{
          background: $blue;
        }
        &.Half{
          background: $yellow;
        }
        &.None{
          background: $orange;
        }
      }

      .treatments{
        ul{
          padding: 0;
          list-style: none;
          margin: 0;

          li{
            display: inline-block;
            margin-right: 0.2rem;
            padding: 0.6rem;
            background: $select;
            margin-top: 0.2rem;
            font-size: 0.9rem;
            border-radius: 6px;
            font-weight: 500;
          }
        }
      }
    }
  }
</style>
