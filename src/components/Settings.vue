<template>
  <div class="settings-list">
      <ul>
        <li class="heading"><span class="w-20"></span><span class="w-40">Treatment</span><span class="w-40">Type</span></li>
        <li v-for="settings in treatmentSettings">
          <span class="w-20">
            <div class="checkbox">
              <div class="checkbox-wrapper">
                <input v-bind:id="settings.name" type="checkbox" @change="saveChanges" v-model="settings.status" formControlName="status" :value="settings.status">
                <label v-bind:for="settings.name"></label>
              </div>
            </div>
          </span>
          <span class="w-40">
            {{settings.name}}
          </span>
          <span class="w-40">
            <select name="type" v-model="settings.customType" @change="saveChanges" :value="settings.customType">
              <option value="others">Others</option>
              <option value="preventative">Preventative</option>
              <option value="relief">Relief</option>
              <option value="rescue">Rescue</option>
            </select>
          </span>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'settings',
  data () {
    return {
      msg: 'Settings tab'
    }
  },
  computed: {
    treatmentSettings(){
      return this.$store.getters.settingsTabResponse
    }
  },
  methods: {
    saveChanges(){
      this.$store.dispatch("postSettings").then(() => {
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .w-20{
    width: 20%;
  }

  .w-40{
    width: 40%;
  }

  ul{
    padding: 0;
    list-style: none;
    background: $select;
    border-radius: 4px;

    li{
      display: flex;
      align-items: center;
      padding: 0.7rem;
      border-bottom: 1px solid rgb(108, 112, 125);

      &:last-of-type{
        border-bottom: none;
      }

      &.heading{
        background: $card-bg;
        border-radius: 4px 4px 0 0;
        padding-top: 1.5rem;
      }
    }
  }

  select{
    border-radius: 4px;
    border: none;
    padding: 0.7rem 0.2rem;
    width: 100%;
  }

  .checkbox-wrapper {
    display: flex;

    input[type=checkbox] {
      height: 0;
      width: 0;
      visibility: hidden;
    }

    label {
      cursor: pointer;
      text-indent: -9999px;
      width: 45px;
      height: 25px;
      background: $card-bg;
      display: block;
      border-radius: 100px;
      position: relative;
    }

    label:after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 21px;
      height: 21px;
      background: #fff;
      border-radius: 90px;
      transition: 0.3s;
    }

    input:checked + label {
      background: $blue;
    }

    input:checked + label:after {
      left: calc(100% - 2px);
      transform: translateX(-100%);
    }

    label:active:after {
      width: 30px;
    }
}

</style>
