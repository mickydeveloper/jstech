<template>
  <div class="recent-list">
    <div class="card-wrapper">
      <div class="card" v-for="recent in RecentList">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'recent',
  data () {
    return {
      msg: 'Recent tab'
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
        case activeLevel: 'Full'
          return 'Active'
          break;
        case activeLevel: 'Half'
          return 'Slower'
          break;
        case activeLevel: 'None'
          return 'Missed'
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .card{
    background: $card-bg;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.8rem;
    display: flex;

    .face{
      display: inline-block;
      width: 20%;
      i{
        font-size: 3.5rem;

        &.fa-smile-o{
          color: $blue;
        }
        &.fa-meh-o{
          color: $yellow;
        }
        &.fa-frown-o{
          color: $orange;
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
            margin-right: 0.3rem;
            padding: 0.6rem;
            background: $select;
            margin-top: 0.4rem;
            font-size: 0.9rem;
            border-radius: 6px;
            font-weight: 500;
          }
        }
      }
    }
  }
</style>
