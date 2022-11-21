<template>
  <audio ref="audio">
    <source src="@/assets/sirena.mp3">
  </audio>
  <template v-if="isLogin">
    <div class="container-fluid">
      <div class="chartbgbg" id="chart">
        <div class="row header">
          <div class="col-md-auto">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li v-for="(group, key) of groups" :key="key" class="nav-item" role="presentation">
                <button
                    class="nav-link active happy"
                    type="button"
                    role="tab"
                    @click="toggleTabs(key, groups)"
                >{{ group.name }}</button>
              </li>
            </ul>
          </div>
          <div class="col-md-auto numbers">
            <p class="percent__counter" style="cursor:pointer;" @click="save">Сохранить</p>
            <p class="percent__counter" style="cursor:pointer;" @click="yan_editor">Кнопка Яна (не нажимать)</p>
            <p class="date__counter" style="cursor:pointer;" @click="logout">Выйти</p>
          </div>
        </div>

        <div v-if="Object.keys(curGroup).length > 0 && !yanEditing" class="tab-content">
          <template v-for="(group, key) of groups">
            <div v-if="group.show"
                 class="tab-pane fade show active animate__animated animate__fadeInUp"
                 role="tabpanel"
                 aria-labelledby="pills-home-tab1"
                 :key="key"
            >
              <div class="row big_graph">
                <!-- Main Bar editing -->
                <div class="col-md-auto">
                  <div class="chartbg animate__animated animate__fadeInUp" id="chart">

                    <ul class="nav nav-pills mb-3" role="tablist">
                      <li
                          v-for="(chart, key) of curGroup.mainBar"
                          class="nav-item animate__animated animate__fadeInUp"
                          role="presentation"
                          :key="key"
                      >
                        <button
                            class="nav-link active happy"
                            type="button"
                            role="tab"
                            @click="toggleInnerTabs(key, curGroup.mainBar)"
                        >{{ chart.name }}</button>
                      </li>
                    </ul>
                    <div class="tab-content">
                      <h5 class="heading2">{{ curGroup.mainBar[curBar].name }}</h5>
                      <template v-if="curBar == ''">
                      </template>
                      <template v-else-if="curBar == 'stressResitance'">
                        <h5 class="heading m-3">Точки</h5>
                        <div v-for="(point, pointKey) in groups[curGroupIndex].mainBar[curBar].chart.series" v-bind:key="pointKey">
                          <input v-model.number="onSave[curGroupIndex].mainBar[curBar].chart.series[pointKey]">
                        </div>
                        <br>
                        <h5 class="heading">Добавление новой точки</h5>
                        <input v-model="onAdd"> <button @click="add(curBar)">Добавить точку</button>
                      </template>
                      <template v-else>
                        <h5 class="heading m-3">Точки</h5>
                        <div class="data-row" v-for="(point, pointKey) in groups[curGroupIndex].mainBar[curBar].chart.series[0].data" v-bind:key="pointKey">
                          <p class="text-white">{{ onSave[curGroupIndex].mainBar[curBar].chart.chartOptions.xaxis.categories[pointKey].split("T")[0] }}:</p> <div><input v-model.number="onSave[curGroupIndex].mainBar[curBar].chart.series[0].data[pointKey]"><button @click="removePoint(curBar, pointKey)">Удалить</button></div>
                        </div>
                        <br>
                        <h5 class="heading m-3">Добавление новой точки</h5>
                        <div>
                          <input type="date" v-model="onAddTime">: <input v-model="onAdd"> <button @click="add(curBar)">Добавить точку</button>
                        </div>
                      </template>
                    </div>

                  </div>
                  <!--                <AreaChart />-->
                </div>
                <!--              Side bar editing-->
                <div class="col-md-auto radial_graphs">
                  <ul class="nav right nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">

                      <button
                          @click='switchTab(1)' class="nav-link active happy" id="pills-home-vovl" data-bs-toggle="pill" data-bs-target="#pills-vovl" type="button" role="tab" aria-controls="pills-vovl" aria-selected="true">Вовлечение</button>
                    </li>
                    <li class="nav-item" role="presentation">

                      <button
                          @click='switchTab(2)' class="nav-link trevoga" id="pills-profile-mot" data-bs-toggle="pill" data-bs-target="#pills-mot" type="button" role="tab" aria-controls="pills-mot" aria-selected="false">Мотивация</button>
                    </li>
                  </ul>
                  <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show" :class="(tab == 1) ? 'active' : ''" id="pills-vovl" role="tabpanel" aria-labelledby="pills-home-vovl">
                      <div class="row graphs">
                        <div class="col-md-auto" v-for="(chart, chartKey) in curGroup.sideBar['Вовлечение'].charts" v-bind:key="chartKey">
                          <h5 class="heading m-3">{{ aliases[chartKey] }}</h5>
                          <p class="text-white">Значение: <input class="rounded" v-model.number="onSave[curGroupIndex].sideBar['Вовлечение'].charts[chartKey].value"></p>
                          <p class="text-white">Изменение: <input class="rounded" v-model.number="onSave[curGroupIndex].sideBar['Вовлечение'].charts[chartKey].delta"></p>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade show" :class="(tab == 2) ? 'active' : ''" id="pills-mot" role="tabpanel" aria-labelledby="pills-home-mot">
                      <div class="row graphs">
                        <div class="col-md-auto" v-for="(chart, chartKey) in curGroup.sideBar['Мотивация'].charts" v-bind:key="chartKey">
                          <h5 class="heading m-3">{{ aliases[chartKey] }}</h5>
                          <p class="text-white">Значение: <input class="rounded" v-model.number="onSave[curGroupIndex].sideBar['Мотивация'].charts[chartKey].value"></p>
                          <p class="text-white">Изменение: <input class="rounded" v-model.number="onSave[curGroupIndex].sideBar['Мотивация'].charts[chartKey].delta"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--              Footer editing -->
                <div class="container-fluid footer">
                  <div class="col-md-auto">
                    <h1 class="heading2 animate__animated animate__fadeInUp mb-2">{{ group.name }}</h1>
                    <div class="row justify-content-center">
                      <div class="col-md-12 number__col mb-2">
                        <span class="text-white">Номер недели: </span>
                        <input v-model.number="onSave.general.week">
                      </div>
                      <div class="col-md-12 number__col mb-2">
                        <span class="text-white">Процент прохождения: </span>
                        <input v-model.number="onSave.general.percent">
                      </div>
                      <div class="col-md-12 number__col mb-2">
                        <span class="text-white">URL видео: </span>
                        <input v-model.number="onSave.general.video_url">
                      </div>
                      <div class="col-md-12 number__col mb-2" v-for="(item, key) in curGroup.footer" v-bind:key="key">
                        <span class="text-white">{{ aliases[key] }}</span>
                        <input v-model.number="onSave[curGroupIndex].footer[key]">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div v-if="yanEditing">
          <img src="https://media.tenor.com/IPNkIxKj91MAAAAi/worry-alert-worry-siren-head.gif" width="184" height="256" alt="Worry Alert Worry Siren Head Sticker - Worry Alert Worry Siren Head Worry Emoji Stickers" style="max-width: 280px; background-color: unset; margin: 12px 48px;">
          <marquee scrolldelay="40" truespeed="true" style="font-size: 80px; color: red;">ЗДЕСЬ РЕДАЧАТ БЭК. ПОКИНЬТЕ ЗАКРЫТУЮ ТЕРРИТОРИЮ. ПЕРЕЗАГРЗКА СТРАНИЦЫ ЗАПРЕЩЕНА</marquee>
          <pre>
            <textarea style="width: 800px; height: 300px; margin-right: 300px;" v-model="onSaveYanychar"></textarea>
          </pre>
          <button @click="saveYanuchar">Кнопка для сохранения (special for Янычар)</button>
        </div>
      </div>
    </div>
    </template>
  <template v-else>
    <div class="container-fluid">
      <div class="chartbgbg" id="chart">
        <h5 class="heading">Введите логин и пароль:</h5>
        <div v-if="failedLogin">
          <p class="text-white p-3"> Ошибка, неверный логин или пароль </p>
        </div>
        <input class="rounded-4 p-2 fs-6" v-model="login" placeholder="Логин"><br><br>
        <input class="rounded-4 p-2 fs-6" type="password" v-model="password" placeholder="Пароль"><br><br>
        <button class="rounded-4 p-2 fs-6" @click="loadDash">Авторизоваться</button>
      </div>
    </div>
  </template>
</template>

<script>
import axios from "axios";
import conf from "@/conf";

export default {
  name: "AdminComp",
  data() {
    return {
      tab: 1,
      yanEditing: false,
      aliases: {
        vovl: "Вовлеченность",
        burnout: "Выгорание",
        motivation: "Мотивация",
        activity: "Активность",
        csi: "CSI",
        delta_csi: "Изменение CSI",
        workload: "Workload",
        delta_workload: "Изменение Workload",
        tension: "Tension",
        delta_tension: "Изменение Tension",
        wealth: "Wealth",
        diet: "Diet",
        sleep: "Sleep",
        impostor: "Impostor",
      },
      curGroup: {},
      curBar: "",
      curGroupIndex: "general",
      onAdd: null,
      onAddTime: null,
      isLogin: false,
      failedLogin: false,
      login: null,
      password: null,
      groups: {
        general: {
          name: 'Общая',
          show: true,
          mainBar: {
            happyIndex: {
              name: 'Happy index',
              show: true,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [43.7, 43.9, 36.4, 46.6, 47.7],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 250,
                    type: 'area',
                    colors: ['rgba(68,255,0,0.72)']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#99ff6a'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  tooltip: {
                    theme: 'dark',
                    color: '#fff',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            anxiety: {
              name: 'Тревога',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [10.1, 7.9, 6.8, 8.1, 7.9],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#a1eb0c'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 20
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            fatigue: {
              name: 'Усталость',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [45.3, 36.5, 42.6, 38.7, 45.9],
                  color: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['#ffb100b8']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#ebc20c'],
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            stressResitance: {
              name: 'Устойчивость к стрессу',
              show: false,
              chart: {
                series: [20],
                chartOptions: {
                  chart: {
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                  },
                  plotOptions: {
                    radialBar: {
                      track: {
                        background: '#212121',
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.25
                        }
                      },
                      startAngle: -135,
                      endAngle: 135,
                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: 120,
                          show: true,
                          color: '#fff',
                          fontSize: '17px',
                          fontWeight: 700
                        },
                        value: {
                          formatter: function(val) {
                            return parseInt(val);
                          },
                          color: '#fff',
                          fontWeight: 700,
                          offsetY: -10,
                          fontSize: '60px',
                          show: true,
                        }
                      }
                    }
                  },
                  stroke: {
                    dashArray: 3
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      type: 'vertical',
                      shadeIntensity: 1,
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 70],
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ffd500",
                          opacity: 1
                        },
                        {
                          offset: 20,
                          color: "#ffe374",
                          opacity: 1
                        },
                        {
                          offset: 60,
                          color: "#fff045",
                          opacity: 1
                        },
                        {
                          offset: 100,
                          color: "#ffda76",
                          opacity: 1
                        }
                      ]
                    }
                  },
                  labels: ['Устойчивость к стрессу'],
                },
              }
            }
          },
          sideBar: {
            'Вовлечение': {
              charts: {
                vovl: {
                  value: 84,
                  delta: 1
                },
                burnout: {
                  value: 30,
                  delta: 0.4
                }
              }
            },
            'Мотивация': {
              charts: {
                motivation: {
                  value: 39,
                  delta: 1.8
                },
                activity: {
                  value: 50,
                  delta: 0.8
                }
              }
            },
          },
          footer: {
            csi: 78,
            delta_csi: 10,
            workload: 68,
            delta_workload: 9,
            tension: 30,
            delta_tension: -13,
            wealth: 35,
            diet: 42,
            sleep: 60,
            impostor: 46
          }
        },
        mobile: {
          name: 'Mobile',
          show: false,
          mainBar: {
            happyIndex: {
              name: 'Happy index',
              show: true,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [42.8, 40.9, 35.5, 45.6, 46.8],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 250,
                    type: 'area',
                    colors: ['rgba(68,255,0,0.72)']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#99ff6a'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  tooltip: {
                    theme: 'dark',
                    color: '#fff',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            anxiety: {
              name: 'Тревога',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [12.4, 9.9, 7.4, 10.4, 10],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#a1eb0c'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"],
                  },
                  yaxis: {
                    min: 0,
                    max: 20
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            fatigue: {
              name: 'Усталость',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [48, 37.1, 38.8, 41.3, 49.2],
                  color: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['#ffb100b8']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#ebc20c'],
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]},
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            stressResitance: {
              name: 'Устойчивость к стрессу',
              show: false,
              chart: {
                series: [20],
                chartOptions: {
                  chart: {
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                  },
                  plotOptions: {
                    radialBar: {
                      track: {
                        background: '#212121',
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.25
                        }
                      },
                      startAngle: -135,
                      endAngle: 135,
                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: 120,
                          show: true,
                          color: '#fff',
                          fontSize: '17px',
                          fontWeight: 700
                        },
                        value: {
                          formatter: function(val) {
                            return parseInt(val);
                          },
                          color: '#fff',
                          fontWeight: 700,
                          offsetY: -10,
                          fontSize: '60px',
                          show: true,
                        }
                      }
                    }
                  },
                  stroke: {
                    dashArray: 3
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      type: 'vertical',
                      shadeIntensity: 1,
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 70],
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ffd500",
                          opacity: 1
                        },
                        {
                          offset: 20,
                          color: "#ffe374",
                          opacity: 1
                        },
                        {
                          offset: 60,
                          color: "#fff045",
                          opacity: 1
                        },
                        {
                          offset: 100,
                          color: "#ffda76",
                          opacity: 1
                        }
                      ]
                    }
                  },
                  labels: ['Устойчивость к стрессу'],
                },
              }
            }
          },
          sideBar: {
            'Вовлечение': {
              charts: {
                vovl: {
                  value: 83,
                  delta: 1
                },
                burnout: {
                  value: 34,
                  delta: 2.1
                }
              }
            },
            'Мотивация': {
              charts: {
                motivation: {
                  value: 43,
                  delta: 3.3
                },
                activity: {
                  value: 55,
                  delta: 2
                }
              }
            },
          },
          footer: {
            csi: 72,
            delta_csi: 7,
            workload: 66,
            delta_workload: 5,
            tension: 29,
            delta_tension: -12,
            wealth: 40,
            diet: 40,
            sleep: 75,
            impostor: 48
          }
        },
        web: {
          name: 'Web',
          show: false,
          mainBar: {
            happyIndex: {
              name: 'Happy index',
              show: true,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [46.3, 41.5, 30.3, 48.4, 49],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 250,
                    type: 'area',
                    colors: ['rgba(68,255,0,0.72)']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#99ff6a'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  tooltip: {
                    theme: 'dark',
                    color: '#fff',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            anxiety: {
              name: 'Тревога',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [10.3, 7.1, 4.9, 9.2, 8],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#a1eb0c'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 20
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            fatigue: {
              name: 'Усталость',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [41.8, 31.6, 41.7, 37.2, 46.1],
                  color: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['#ffb100b8']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#ebc20c'],
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            stressResitance: {
              name: 'Устойчивость к стрессу',
              show: false,
              chart: {
                series: [21],
                chartOptions: {
                  chart: {
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                  },
                  plotOptions: {
                    radialBar: {
                      track: {
                        background: '#212121',
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.25
                        }
                      },
                      startAngle: -135,
                      endAngle: 135,
                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: 120,
                          show: true,
                          color: '#fff',
                          fontSize: '17px',
                          fontWeight: 700
                        },
                        value: {
                          formatter: function(val) {
                            return parseInt(val);
                          },
                          color: '#fff',
                          fontWeight: 700,
                          offsetY: -10,
                          fontSize: '60px',
                          show: true,
                        }
                      }
                    }
                  },
                  stroke: {
                    dashArray: 3
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      type: 'vertical',
                      shadeIntensity: 1,
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 70],
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ff001e",
                          opacity: 1
                        },
                        {
                          offset: 20,
                          color: "#ff7489",
                          opacity: 1
                        },
                        {
                          offset: 60,
                          color: "#ff4583",
                          opacity: 1
                        },
                        {
                          offset: 100,
                          color: "#ff0026",
                          opacity: 1
                        }
                      ]
                    }
                  },
                  labels: ['Устойчивость к стрессу'],
                },
              }
            }
          },
          sideBar: {
            'Вовлечение': {
              charts: {
                vovl: {
                  value: 12,
                  delta: 1
                },
                burnout: {
                  value: 23,
                  delta: 14
                }
              }
            },
            'Мотивация': {
              charts: {
                motivation: {
                  value: 12,
                  delta: 1
                },
                activity: {
                  value: 23,
                  delta: 14
                }
              }
            },
          },
          footer: {
            csi: 79,
            delta_csi: 19,
            workload: 71,
            delta_workload: 15,
            tension: 28,
            delta_tension: -8,
            wealth: 30,
            diet: 55,
            sleep: 70,
            impostor: 47
          }
        },
        add: {
          name: 'Add',
          show: false,
          mainBar: {
            happyIndex: {
              name: 'Happy index',
              show: true,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [40.4, 43.8, 45.2, 45.4, 44.5],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 250,
                    type: 'area',
                    colors: ['rgba(68,255,0,0.72)']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#99ff6a'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  tooltip: {
                    theme: 'dark',
                    color: '#fff',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            anxiety: {
              name: 'Тревога',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [20.6, 15.4, 14.2, 13.4, 11.5],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#a1eb0c'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 20
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            fatigue: {
              name: 'Усталость',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [53.0, 46.6, 43.2, 47.8, 46.8],
                  color: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['#ffb100b8']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#ebc20c'],
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]},
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            stressResitance: {
              name: 'Устойчивость к стрессу',
              show: false,
              chart: {
                series: [26],
                chartOptions: {
                  chart: {
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                  },
                  plotOptions: {
                    radialBar: {
                      track: {
                        background: '#212121',
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.25
                        }
                      },
                      startAngle: -135,
                      endAngle: 135,
                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: 120,
                          show: true,
                          color: '#fff',
                          fontSize: '17px',
                          fontWeight: 700
                        },
                        value: {
                          formatter: function(val) {
                            return parseInt(val);
                          },
                          color: '#fff',
                          fontWeight: 700,
                          offsetY: -0,
                          fontSize: '60px',
                          show: true,
                        }
                      }
                    }
                  },
                  stroke: {
                    dashArray: 3
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      type: 'vertical',
                      shadeIntensity: 1,
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 70],
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ff001e",
                          opacity: 1
                        },
                        {
                          offset: 20,
                          color: "#ff7489",
                          opacity: 1
                        },
                        {
                          offset: 60,
                          color: "#ff4583",
                          opacity: 1
                        },
                        {
                          offset: 100,
                          color: "#ff0026",
                          opacity: 1
                        }
                      ]
                    }
                  },
                  labels: ['Устойчивость к стрессу'],
                },
              }
            }
          },
          sideBar: {
            'Вовлечение': {
              charts: {
                vovl: {
                  value: 90,
                  delta: 12
                },
                burnout: {
                  value: 44,
                  delta: 2.3
                }
              }
            },
            'Мотивация': {
              charts: {
                motivation: {
                  value: 40,
                  delta: -4.2
                },
                activity: {
                  value: 52,
                  delta: -7.5
                }
              }
            },
          },
          footer: {
            csi: 85,
            delta_csi: 1,
            workload: 72,
            delta_workload: 14,
            tension: 38,
            delta_tension: -4,
            wealth: 33,
            diet: 67,
            sleep: 67,
            impostor: 46
          }
        },
        web2: {
          name: 'Web 2.0',
          show: false,
          mainBar: {
            happyIndex: {
              name: 'Happy index',
              show: true,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [41.6, 45.2, 38.8, 46, 47.1],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 250,
                    type: 'area',
                    colors: ['rgba(68,255,0,0.72)']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#99ff6a'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]},
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  tooltip: {
                    theme: 'dark',
                    color: '#fff',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            anxiety: {
              name: 'Тревога',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [9.9, 8.6, 6.7, 7.3, 8.2],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#a1eb0c'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]},
                  yaxis: {
                    min: 0,
                    max: 20
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            fatigue: {
              name: 'Усталость',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [48.3, 39.7, 42, 40.3, 45.5],
                  color: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['#ffb100b8']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#ebc20c'],
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            stressResitance: {
              name: 'Устойчивость к стрессу',
              show: false,
              chart: {
                series: [21],
                chartOptions: {
                  chart: {
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                  },
                  plotOptions: {
                    radialBar: {
                      track: {
                        background: '#212121',
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.25
                        }
                      },
                      startAngle: -135,
                      endAngle: 135,
                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: 120,
                          show: true,
                          color: '#fff',
                          fontSize: '17px',
                          fontWeight: 700
                        },
                        value: {
                          formatter: function(val) {
                            return parseInt(val);
                          },
                          color: '#fff',
                          fontWeight: 700,
                          offsetY: -0,
                          fontSize: '60px',
                          show: true,
                        }
                      }
                    }
                  },
                  stroke: {
                    dashArray: 3
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      type: 'vertical',
                      shadeIntensity: 1,
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 70],
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ff001e",
                          opacity: 1
                        },
                        {
                          offset: 20,
                          color: "#ff7489",
                          opacity: 1
                        },
                        {
                          offset: 60,
                          color: "#ff4583",
                          opacity: 1
                        },
                        {
                          offset: 100,
                          color: "#ff0026",
                          opacity: 1
                        }
                      ]
                    }
                  },
                  labels: ['Устойчивость к стрессу'],
                },
              }
            }
          },
          sideBar: {
            'Вовлечение': {
              charts: {
                vovl: {
                  value: 80,
                  delta: -2
                },
                burnout: {
                  value: 33,
                  delta: 0.9
                }
              }
            },
            'Мотивация': {
              charts: {
                motivation: {
                  value: 37,
                  delta: -0.3
                },
                activity: {
                  value: 50,
                  delta: -2.1
                }
              }
            },
          },
          footer: {
            csi: 74,
            delta_csi: 12,
            workload: 65,
            delta_workload: 6,
            tension: 33,
            delta_tension: -18,
            wealth: 43,
            diet: 43,
            sleep: 67,
            impostor: 47
          }
        }
      },
      onSave: {
        general: {
          week: 42,
          percent: 97,
          name: 'Общая',
          show: true,
          video_url: "",
          mainBar: {
            happyIndex: {
              name: 'Happy index',
              show: true,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [43.7, 43.9, 36.4, 46.6, 47.7],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 250,
                    type: 'area',
                    colors: ['rgba(68,255,0,0.72)']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#99ff6a'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  tooltip: {
                    theme: 'dark',
                    color: '#fff',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            anxiety: {
              name: 'Тревога',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [10.1, 7.9, 6.8, 8.1, 7.9],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#a1eb0c'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 20
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            fatigue: {
              name: 'Усталость',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [45.3, 36.5, 42.6, 38.7, 45.9],
                  color: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['#ffb100b8']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#ebc20c'],
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            stressResitance: {
              name: 'Устойчивость к стрессу',
              show: false,
              chart: {
                series: [20],
                chartOptions: {
                  chart: {
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                  },
                  plotOptions: {
                    radialBar: {
                      track: {
                        background: '#212121',
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.25
                        }
                      },
                      startAngle: -135,
                      endAngle: 135,
                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: 120,
                          show: true,
                          color: '#fff',
                          fontSize: '17px',
                          fontWeight: 700
                        },
                        value: {
                          formatter: function(val) {
                            return parseInt(val);
                          },
                          color: '#fff',
                          fontWeight: 700,
                          offsetY: -10,
                          fontSize: '60px',
                          show: true,
                        }
                      }
                    }
                  },
                  stroke: {
                    dashArray: 3
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      type: 'vertical',
                      shadeIntensity: 1,
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 70],
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ffd500",
                          opacity: 1
                        },
                        {
                          offset: 20,
                          color: "#ffe374",
                          opacity: 1
                        },
                        {
                          offset: 60,
                          color: "#fff045",
                          opacity: 1
                        },
                        {
                          offset: 100,
                          color: "#ffda76",
                          opacity: 1
                        }
                      ]
                    }
                  },
                  labels: ['Устойчивость к стрессу'],
                },
              }
            }
          },
          sideBar: {
            'Вовлечение': {
              charts: {
                vovl: {
                  value: 84,
                  delta: 1
                },
                burnout: {
                  value: 30,
                  delta: 0.4
                }
              }
            },
            'Мотивация': {
              charts: {
                motivation: {
                  value: 39,
                  delta: 1.8
                },
                activity: {
                  value: 50,
                  delta: 0.8
                }
              }
            },
          },
          footer: {
            csi: 78,
            delta_csi: 10,
            workload: 68,
            delta_workload: 9,
            tension: 30,
            delta_tension: -13,
            wealth: 35,
            diet: 42,
            sleep: 60,
            impostor: 46
          }
        },
        mobile: {
          name: 'Mobile',
          show: false,
          mainBar: {
            happyIndex: {
              name: 'Happy index',
              show: true,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [42.8, 40.9, 35.5, 45.6, 46.8],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 250,
                    type: 'area',
                    colors: ['rgba(68,255,0,0.72)']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#99ff6a'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  tooltip: {
                    theme: 'dark',
                    color: '#fff',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            anxiety: {
              name: 'Тревога',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [12.4, 9.9, 7.4, 10.4, 10],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#a1eb0c'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"],
                  },
                  yaxis: {
                    min: 0,
                    max: 20
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            fatigue: {
              name: 'Усталость',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [48, 37.1, 38.8, 41.3, 49.2],
                  color: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['#ffb100b8']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#ebc20c'],
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]},
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            stressResitance: {
              name: 'Устойчивость к стрессу',
              show: false,
              chart: {
                series: [20],
                chartOptions: {
                  chart: {
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                  },
                  plotOptions: {
                    radialBar: {
                      track: {
                        background: '#212121',
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.25
                        }
                      },
                      startAngle: -135,
                      endAngle: 135,
                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: 120,
                          show: true,
                          color: '#fff',
                          fontSize: '17px',
                          fontWeight: 700
                        },
                        value: {
                          formatter: function(val) {
                            return parseInt(val);
                          },
                          color: '#fff',
                          fontWeight: 700,
                          offsetY: -10,
                          fontSize: '60px',
                          show: true,
                        }
                      }
                    }
                  },
                  stroke: {
                    dashArray: 3
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      type: 'vertical',
                      shadeIntensity: 1,
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 70],
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ffd500",
                          opacity: 1
                        },
                        {
                          offset: 20,
                          color: "#ffe374",
                          opacity: 1
                        },
                        {
                          offset: 60,
                          color: "#fff045",
                          opacity: 1
                        },
                        {
                          offset: 100,
                          color: "#ffda76",
                          opacity: 1
                        }
                      ]
                    }
                  },
                  labels: ['Устойчивость к стрессу'],
                },
              }
            }
          },
          sideBar: {
            'Вовлечение': {
              charts: {
                vovl: {
                  value: 83,
                  delta: 1
                },
                burnout: {
                  value: 34,
                  delta: 2.1
                }
              }
            },
            'Мотивация': {
              charts: {
                motivation: {
                  value: 43,
                  delta: 3.3
                },
                activity: {
                  value: 55,
                  delta: 2
                }
              }
            },
          },
          footer: {
            csi: 72,
            delta_csi: 7,
            workload: 66,
            delta_workload: 5,
            tension: 29,
            delta_tension: -12,
            wealth: 40,
            diet: 40,
            sleep: 75,
            impostor: 48
          }
        },
        web: {
          name: 'Web',
          show: false,
          mainBar: {
            happyIndex: {
              name: 'Happy index',
              show: true,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [46.3, 41.5, 30.3, 48.4, 49],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 250,
                    type: 'area',
                    colors: ['rgba(68,255,0,0.72)']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#99ff6a'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  tooltip: {
                    theme: 'dark',
                    color: '#fff',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            anxiety: {
              name: 'Тревога',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [10.3, 7.1, 4.9, 9.2, 8],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#a1eb0c'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 20
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            fatigue: {
              name: 'Усталость',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [41.8, 31.6, 41.7, 37.2, 46.1],
                  color: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['#ffb100b8']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#ebc20c'],
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            stressResitance: {
              name: 'Устойчивость к стрессу',
              show: false,
              chart: {
                series: [21],
                chartOptions: {
                  chart: {
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                  },
                  plotOptions: {
                    radialBar: {
                      track: {
                        background: '#212121',
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.25
                        }
                      },
                      startAngle: -135,
                      endAngle: 135,
                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: 120,
                          show: true,
                          color: '#fff',
                          fontSize: '17px',
                          fontWeight: 700
                        },
                        value: {
                          formatter: function(val) {
                            return parseInt(val);
                          },
                          color: '#fff',
                          fontWeight: 700,
                          offsetY: -10,
                          fontSize: '60px',
                          show: true,
                        }
                      }
                    }
                  },
                  stroke: {
                    dashArray: 3
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      type: 'vertical',
                      shadeIntensity: 1,
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 70],
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ff001e",
                          opacity: 1
                        },
                        {
                          offset: 20,
                          color: "#ff7489",
                          opacity: 1
                        },
                        {
                          offset: 60,
                          color: "#ff4583",
                          opacity: 1
                        },
                        {
                          offset: 100,
                          color: "#ff0026",
                          opacity: 1
                        }
                      ]
                    }
                  },
                  labels: ['Устойчивость к стрессу'],
                },
              }
            }
          },
          sideBar: {
            'Вовлечение': {
              charts: {
                vovl: {
                  value: 12,
                  delta: 1
                },
                burnout: {
                  value: 23,
                  delta: 14
                }
              }
            },
            'Мотивация': {
              charts: {
                motivation: {
                  value: 12,
                  delta: 1
                },
                activity: {
                  value: 23,
                  delta: 14
                }
              }
            },
          },
          footer: {
            csi: 79,
            delta_csi: 19,
            workload: 71,
            delta_workload: 15,
            tension: 28,
            delta_tension: -8,
            wealth: 30,
            diet: 55,
            sleep: 70,
            impostor: 47
          }
        },
        add: {
          name: 'Add',
          show: false,
          mainBar: {
            happyIndex: {
              name: 'Happy index',
              show: true,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [40.4, 43.8, 45.2, 45.4, 44.5],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 250,
                    type: 'area',
                    colors: ['rgba(68,255,0,0.72)']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#99ff6a'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  tooltip: {
                    theme: 'dark',
                    color: '#fff',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            anxiety: {
              name: 'Тревога',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [20.6, 15.4, 14.2, 13.4, 11.5],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#a1eb0c'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 20
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            fatigue: {
              name: 'Усталость',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [53.0, 46.6, 43.2, 47.8, 46.8],
                  color: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['#ffb100b8']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#ebc20c'],
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]},
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            stressResitance: {
              name: 'Устойчивость к стрессу',
              show: false,
              chart: {
                series: [26],
                chartOptions: {
                  chart: {
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                  },
                  plotOptions: {
                    radialBar: {
                      track: {
                        background: '#212121',
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.25
                        }
                      },
                      startAngle: -135,
                      endAngle: 135,
                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: 120,
                          show: true,
                          color: '#fff',
                          fontSize: '17px',
                          fontWeight: 700
                        },
                        value: {
                          formatter: function(val) {
                            return parseInt(val);
                          },
                          color: '#fff',
                          fontWeight: 700,
                          offsetY: -0,
                          fontSize: '60px',
                          show: true,
                        }
                      }
                    }
                  },
                  stroke: {
                    dashArray: 3
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      type: 'vertical',
                      shadeIntensity: 1,
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 70],
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ff001e",
                          opacity: 1
                        },
                        {
                          offset: 20,
                          color: "#ff7489",
                          opacity: 1
                        },
                        {
                          offset: 60,
                          color: "#ff4583",
                          opacity: 1
                        },
                        {
                          offset: 100,
                          color: "#ff0026",
                          opacity: 1
                        }
                      ]
                    }
                  },
                  labels: ['Устойчивость к стрессу'],
                },
              }
            }
          },
          sideBar: {
            'Вовлечение': {
              charts: {
                vovl: {
                  value: 90,
                  delta: 12
                },
                burnout: {
                  value: 44,
                  delta: 2.3
                }
              }
            },
            'Мотивация': {
              charts: {
                motivation: {
                  value: 40,
                  delta: -4.2
                },
                activity: {
                  value: 52,
                  delta: -7.5
                }
              }
            },
          },
          footer: {
            csi: 85,
            delta_csi: 1,
            workload: 72,
            delta_workload: 14,
            tension: 38,
            delta_tension: -4,
            wealth: 33,
            diet: 67,
            sleep: 67,
            impostor: 46
          }
        },
        web2: {
          name: 'Web 2.0',
          show: false,
          mainBar: {
            happyIndex: {
              name: 'Happy index',
              show: true,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [41.6, 45.2, 38.8, 46, 47.1],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 250,
                    type: 'area',
                    colors: ['rgba(68,255,0,0.72)']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#99ff6a'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]},
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  tooltip: {
                    theme: 'dark',
                    color: '#fff',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            anxiety: {
              name: 'Тревога',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [9.9, 8.6, 6.7, 7.3, 8.2],
                  colors: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['rgba(38,255,0,0.72)']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#a1eb0c'],
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]},
                  yaxis: {
                    min: 0,
                    max: 20
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            fatigue: {
              name: 'Усталость',
              show: false,
              chart: {
                series: [{
                  name: 'Значение',
                  data: [48.3, 39.7, 42, 40.3, 45.5],
                  color: '#ebc20c'
                }],
                chartOptions: {
                  chart: {
                    toolbar: {
                      show: false
                    },
                    height: 350,
                    type: 'area',
                    colors: ['#ffb100b8']
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth',
                    colors: ['#ffb100b8']
                  },
                  fill: {
                    type: 'solid',
                    colors: ['#ebc20c'],
                  },
                  xaxis: {
                    colors: ['#fff'],
                    type: 'datetime',
                    categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
                  },
                  yaxis: {
                    min: 0,
                    max: 70
                  },
                  markers: {
                    colors: ['#ebc20c'],
                    strokeColors: '#000'
                  },
                  tooltip: {
                    theme: 'dark',
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  },
                },
              }
            },
            stressResitance: {
              name: 'Устойчивость к стрессу',
              show: false,
              chart: {
                series: [21],
                chartOptions: {
                  chart: {
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                  },
                  plotOptions: {
                    radialBar: {
                      track: {
                        background: '#212121',
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.25
                        }
                      },
                      startAngle: -135,
                      endAngle: 135,
                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: 120,
                          show: true,
                          color: '#fff',
                          fontSize: '17px',
                          fontWeight: 700
                        },
                        value: {
                          formatter: function(val) {
                            return parseInt(val);
                          },
                          color: '#fff',
                          fontWeight: 700,
                          offsetY: -0,
                          fontSize: '60px',
                          show: true,
                        }
                      }
                    }
                  },
                  stroke: {
                    dashArray: 3
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      type: 'vertical',
                      shadeIntensity: 1,
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 70],
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ff001e",
                          opacity: 1
                        },
                        {
                          offset: 20,
                          color: "#ff7489",
                          opacity: 1
                        },
                        {
                          offset: 60,
                          color: "#ff4583",
                          opacity: 1
                        },
                        {
                          offset: 100,
                          color: "#ff0026",
                          opacity: 1
                        }
                      ]
                    }
                  },
                  labels: ['Устойчивость к стрессу'],
                },
              }
            }
          },
          sideBar: {
            'Вовлечение': {
              charts: {
                vovl: {
                  value: 80,
                  delta: -2
                },
                burnout: {
                  value: 33,
                  delta: 0.9
                }
              }
            },
            'Мотивация': {
              charts: {
                motivation: {
                  value: 37,
                  delta: -0.3
                },
                activity: {
                  value: 50,
                  delta: -2.1
                }
              }
            },
          },
          footer: {
            csi: 74,
            delta_csi: 12,
            workload: 65,
            delta_workload: 6,
            tension: 33,
            delta_tension: -18,
            wealth: 43,
            diet: 43,
            sleep: 67,
            impostor: 47
          }
        }
      },
      onSaveYanychar: ""
    }
  },
  created() {
    if (localStorage.getItem('loggedIn')) {
      if (Date.now() - parseInt(localStorage.getItem('loggedIn')) < 60*60*1000) {
        this.isLogin = true;
        this.loadData();
      }
    }
  },
  methods: {
    yan_editor() {
      this.yanEditing = !this.yanEditing;
      this.$refs.audio.play();
    },
    loadData() {
        axios.post('https://mailer.psyreply.com/admin/dash', { table: conf.table }).then(res => {
          this.groups = JSON.stringify(res.data);
          console.log(res.data);
          this.onSaveYanychar = this.groups;
          this.onSave = JSON.parse(this.groups);
          this.groups = JSON.parse(this.groups);
          this.toggleTabs("general", this.groups);
          this.toggleInnerTabs("happyIndex", this.curGroup.mainBar)
        });
    },
    loadDash() {
      axios.post('https://mailer.psyreply.com/admin/dash/login', { login: this.login, password: this.password  }).then(res => {
        localStorage.setItem('loggedIn', (new Date()).getTime())
        this.isLogin = res.data
        this.failedLogin = !res.data;
        if (this.isLogin) {
          this.loadData();
        }
      })
    },
    toggleTabs(key, tabs) {
      console.log(key, tabs)
      for (let tab in tabs) tabs[tab].show = false
      this.curGroup = JSON.parse(JSON.stringify(this.groups[key]));
      this.curGroupIndex = key;
      tabs[key].show = true
    },
    toggleInnerTabs(key, tabs) {
      console.log(key, tabs)
      for (let tab in tabs) tabs[tab].show = false
      this.curBar = key;
      tabs[key].show = true
    },
    switchTab(tab) {
      this.tab = tab;
    },
    add(key) {
      this.onSave[this.curGroupIndex].mainBar[key].chart.series[0].data.push(parseFloat(this.onAdd));
      this.groups[this.curGroupIndex].mainBar[key].chart.series[0].data.push(parseFloat(this.onAdd));
      if (key != "stressResitance") {
        this.onSave[this.curGroupIndex].mainBar[key].chart.chartOptions.xaxis.categories.push(this.onAddTime)
        this.groups[this.curGroupIndex].mainBar[key].chart.chartOptions.xaxis.categories.push(this.onAddTime)
      }
      this.onAdd = null;
      this.onAddTime = null;
    },
    removePoint(key, point) {
      this.onSave[this.curGroupIndex].mainBar[key].chart.series[0].data.splice(point, 1);
      this.groups[this.curGroupIndex].mainBar[key].chart.series[0].data.splice(point, 1);
      this.onSave[this.curGroupIndex].mainBar[key].chart.chartOptions.xaxis.categories.splice(point, 1);
      this.groups[this.curGroupIndex].mainBar[key].chart.chartOptions.xaxis.categories.splice(point, 1);
    },
    save() {
      alert("Данные сохранены!");
      const saved = JSON.stringify(this.onSave);
      console.log(this.onSave.general.video_url);
      axios.post('https://mailer.psyreply.com/save/admin/dash', { table: conf.table, data: saved });
    },
    saveYanuchar() {
      alert("Спасибо тебе Ян, данные сохранены!");
      const saved = this.onSaveYanychar;
      console.log(saved);
      axios.post('https://mailer.psyreply.com/save/admin/dash', { table: conf.table, data: saved });
    },
    logout() {
      localStorage.removeItem('loggedIn');
      window.location.reload()
    }
  }
}
</script>


<style scoped>
.data-row {
  display: flex;
  justify-content: space-between;
}
html {
  overflow: visible !important;
  overflow-x: visible !important;
  overflow-y: visible !important;
}

* {
  overflow: visible !important;
  overflow-x: visible !important;
  overflow-y: visible !important;
}

@media (max-width: 576px) {
  .container-fluid {
    display: none!important;
    overflow-x: hidden!important;
    overflow-y: hidden!important;
    overflow: hidden!important;
  }
}
@media only screen and (max-width: 1070px) {
}
.heading {
  font-size: 20px!important;
  color: white;
  margin-top: 5px;
  font-weight: 700;
  margin-bottom: 0;
}
.container-fluid {
//width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
}
.col__number {
  display: flex;
  flex-direction: row;
}
.heading2 {
  font-weight: 700;
  text-align: left;
  margin: 0;
  color: white;
  margin-top: 30px;
  font-size: 23px!important;
}
.number {
  text-align: left;
  font-weight: 700;
}
.container__numbers {
  position: relative;
}
.number__col {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
}
.graphs {
  position: relative;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.big_graph {
  margin-top: 10px;
  max-height: 500px;
}
.number {
  font-size: 33px;
  color: white;
  text-align: left;
  line-height: 40px;
  margin:0;
}
.numberup {
  font-size: 14px!important;
  color: #7cfc00;
  font-weight: 700;
  line-height: 0px;
}
.numberdown {
  font-size: 25px;
  color: #fc004c;
  font-weight: 700;
  line-height: 40px;
}
.webmobile {
  display: flex;
  flex-direction: row;
  /* margin-top: 40px; */
  justify-content: flex-start;
}
.radial_graphs {
  background: #202020;
  border-radius: 16px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding-left: 30px;
  border: 2px solid #ffb100b8;
  box-shadow: 0 2px 100px #ff810054!important;
  max-width: 400px;
  width: 100%;
  max-height: 502px;
  padding-top: 25px;
}
.psylogo {
  width: 50px;
  margin-top: 110px;
}
.col__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0px;
}

.logo:after {
  position: absolute;
  content: "";
  top: 13vw;
  left: 0;
  right: 0;
  height: 40%;
  width: 20%;
  margin: 0 auto;
  transform: scale(1);
  -webkit-filter: blur(5vw);
  -moz-filter: blur(5vw);
  -ms-filter: blur(5vw);
  filter: blur(5vw);
  background: linear-gradient(270deg, #fa709a, #fee140);
  background-size: 200% 200%;
  overflow: hidden;
  z-index: 1;
  animation: animateGlow 10s ease infinite;
}
@keyframes animateGlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.webcol {
}
.mobilecol {
  padding-right: 100px;
}
.logo {
  top: 100px;
}
.video {
  z-index: 999999;
  padding-bottom: 100px;
}
.chartbgbg {
  background: #202020;
  border-radius: 16px;
  backdrop-filter: blur(5px);
  padding-top: 0px;
  -webkit-backdrop-filter: blur(5px);
  padding-bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;
  min-width: 660px!important;
  box-sizing: content-box;
  width: 70%;
  margin-top: 30px!important;
  margin-bottom: 30px!important;
}
.heading {
  font-size: 20px;
  text-align: left;
}
.happy.active {
  background-color: transparent!important;
  border: 2px solid #ffb100b8;
  box-shadow: 0 2px 15px #ff810054!important;
  font-weight: 700;
}
.happy {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.47);
}
.happy:hover {
  color: #fff;
}
happy.active {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  box-shadow: 0 2px 15px #ff810054!important;
  font-weight: 700;
}
.trevoga.active {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  box-shadow: 0 2px 15px #ff810054!important;
  font-weight: 700;
}
.trevoga {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.47);
}
.trevoga:hover {
  color: #fff;
}
.ustalost.active {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  box-shadow: 0 2px 15px #ff810054!important;
  font-weight: 700;
}
.ustalost {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.47);
}
.ustalost:hover {
  color: #fff;
}
button {
  margin-right: 10px;
}
.motivation__radial {  margin-left: 15px;
  margin-bottom: 10px;
  font-size: 10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  min-height: 100%!important;
}
.lorem {
  font-size: 13px;
  color: white;
  max-width: 500px;
}
.nav-pills {
  margin: 0;
  font-size: 16px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.nav.right {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0;
}
.numbers {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  margin-right: 35px;
}
.percent__counter {
  color: white;
  margin-bottom: 0;
  background-color: transparent;
  padding: 5px;
  font-size: 10px;
  border-radius: 10px;
  margin-right: 5px;
  border: 2px solid rgba(136, 255, 0, 0.72);
  box-shadow: 0 2px 10px rgba(162, 255, 0, 0.33) !important;
}
.date__counter {
  color: white;
  margin-bottom: 0;
  background-color: transparent;
  padding: 5px;
  font-size: 10px;
  border-radius: 10px;
  margin-right: 5px;
  border: 2px solid #ffb100b8;
  box-shadow: 0 2px 10px #ff810054;
}
.date__number {
  font-weight: 700;
}
.percent {
  font-weight: 700;
}
.numberup {
  font-size: 12px;
  color: #7cfc00;
  font-weight: 700;
}
.date__number {
  font-weight: 700;
}

.col.numbers {
  padding-left: 300px;
}
.row.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.numberup1 {
  font-size: 12px;
  color: #ff2436;
  font-weight: 700;
}
.nav-pills .nav-link {
  padding: 5px;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 10px;
}
.container-fluid.footer {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: auto;
  margin-top: 0px;
  margin-right: 35px;
}
.logopsy {
  width: 40px;
}
.container {
  width: 360px;
  display: flex;
  padding: 0;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 17px 40px #ff810054;
  border: 2px solid #ffb100b8;
}
a {
  color: white;
  font-weight: 500;
  text-decoration: none;
  margin-top: 5px;
}
a:hover {
  color: white;
  font-weight: 500;
  text-decoration: none;
  margin-top: 5px;
}
.tooltip1 {
  position: relative;
  display: inline-block;
}

.tooltip1 .tooltiptext1 {
  visibility: hidden;
  width: 400px;
  font-size: 15px;
  font-weight: 500;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 1s;
  box-shadow: 0 17px 40px #ff810054;
  border: 2px solid #ffb100b8;
}

.tooltip1:hover .tooltiptext1 {
  visibility: visible;
  opacity: 1;
}
b {
  font-weight: 700;
}
.btn {
  color: #ffb100b8;
  border-radius: 10px;
}
.btn:hover {
  color: white!important;
}
i {
}
.wealth {
  margin-left: 50px;
}

/*.main-bar {
  border-radius: 15px;
  color: white;
  border: 2px solid #ffb100b8;
  box-shadow: 0 2px 100px #ff810054!important;
}*/
.heading {
  font-size: 25px;
  text-align: left;
  padding-left: 0;
}

.chartbg {
  background: #202020;
  border-radius: 16px;
  backdrop-filter: blur(5px);
  padding-top: 30px;
  -webkit-backdrop-filter: blur(5px);
  border: 2px solid #ffb100b8;
  padding-bottom: 30px;
  box-shadow: 0 2px 100px #ff810054!important;
  padding-left: 30px;
  padding-right: 30px;
  min-width: 600px;
}
.happy.active {
  background-color: transparent!important;
  border: 2px solid #ffb100b8;
  box-shadow: 0 2px 15px #ff810054!important;
  font-weight: 700;
}
.happy {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.47);
}
.happy:hover {
  color: #fff;
}
happy.active {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  box-shadow: 0 2px 15px #ff810054!important;
  font-weight: 700;
}
.trevoga.active {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  box-shadow: 0 2px 15px #ff810054!important;
  font-weight: 700;
}
.trevoga {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.47);
}
.trevoga:hover {
  color: #fff;
}
.ustalost.active {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  box-shadow: 0 2px 15px #ff810054!important;
  font-weight: 700;
}
.ustalost {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.47);
}
.ustalost:hover {
  color: #fff;
}
button {
  margin-left: 15px;
  margin-bottom: 10px;
  font-size: 10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.motivation__radial {
  min-height: 100%!important;
}
.lorem {
  font-size: 13px;
  color: white;
  max-width: 500px;
}
</style>
