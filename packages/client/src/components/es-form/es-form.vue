<script setup lang="ts">
import type {
  FormItemRule,
  EsFormOptions,
  EsFormProps,
} from '@/components/es-form/types'
import type { IterateObject } from '@/types/global'
import { config } from '@/components/libs/config/config.default'
import { useConfig } from '@/components/libs/hooks/useConfig'

defineOptions({
  name: 'EsForm',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<EsFormProps>(), {
  labelPosition: 'left',
  labelWidth: 200,
  labelAlign: 'left',
})

const emits = defineEmits<{
  (event: 'change', key: string, value: any, data: IterateObject): void
  (event: 'submit', data: IterateObject): void
}>()

function labelWidth(item: EsFormOptions) {
  const widthNum = item.labelWidth || props.labelWidth
  return widthNum + config.unit
}

function required(rules?: FormItemRule[]) {
  if (!rules) {
    return false
  }
  return rules.some(rule => rule.required)
}

const formModel = defineModel({
  default: () => ({}) as IterateObject,
})
const formInstance = ref()

const emitChangeEvent = (key: string, value: any) => {
  emits('change', key, value, formModel.value)
}

const handleSubmit = async () => {
  try {
    await formInstance.value.validate()
    emits('submit', formModel.value)
  } catch (e) {
    console.log(e)
  }
}

function clearDate(field: string) {
  formModel.value[field] = ''
}
</script>

<template>
  <uni-forms
    ref="formInstance"
    :model="formModel"
    class="bg-white pb-24"
    :label-position="labelPosition"
    border
  >
    <uni-forms-item
      v-for="item in options"
      :key="item.field"
      :name="item.field"
      :rules="item.rules"
    >
      <template #label>
        <view class="flex p-2 pl-0">
          <view :style="{ width: labelWidth(item) }" class="flex">
            <es-text
              v-if="required(item.rules)"
              text="*"
              color="#ee0a24"
              class="mr-1"
            />
            <es-text :text="item.label" />
          </view>
        </view>
      </template>
      <!-- 输入框     -->
      <uni-easyinput
        v-if="item.component === 'input'"
        v-model="formModel[item.field]"
        :type="item.props?.inputType ?? 'text'"
        :input-border="false"
        :disabled="item.props?.disabled ?? false"
        :maxlength="item.props?.maxLength ?? -1"
        :placeholder="item.props?.placeholder"
        placeholder-style="font-size:32rpx;"
        @change="emitChangeEvent(item.field, formModel[item.field])"
      />

      <!-- 上传     -->
      <es-upload
        v-if="item.component === 'upload'"
        v-model="formModel[item.field]"
        :limit="item.props?.limit ?? 9"
        :disabled="item.props?.disabled ?? false"
        @update:model-value="emitChangeEvent(item.field, formModel[item.field])"
      />
      <!--  时间 -->
      <view v-if="item.component === 'date'" class="h-9">
        <uni-datetime-picker
          v-model="formModel[item.field]"
          :border="false"
          :disabled="item.props?.disabled ?? false"
          :type="item.props?.dateType || 'date'"
          @change="emitChangeEvent(item.field, formModel[item.field])"
        >
          <view
            class="h-full flex items-center justify-between"
            :class="item.props?.disabled ? 'bg-#F7F6F6' : ''"
          >
            <es-text
              :text="formModel[item.field] || item.props?.placeholder"
              :color="
                formModel[item.field]
                  ? item.props?.disabled
                    ? 'disabled'
                    : 'base'
                  : 'placeholder'
              "
            />
            <view
              v-if="formModel[item.field] && !item.props?.disabled"
              class="pl-1 pr-1"
              @click.stop="clearDate(item.field)"
            >
              <uni-icons type="clear" size="24" color="#c0c4cc" />
            </view>
          </view>
        </uni-datetime-picker>
      </view>

      <!-- 单选     -->
      <view v-if="item.component === 'radio'" class="h-9 flex items-center">
        <uni-data-checkbox
          v-model="formModel[item.field]"
          :localdata="item.props?.options"
          :disabled="item.props?.disabled ?? false"
          :selected-color="useConfig.getColor('primary')"
          @change="emitChangeEvent(item.field, formModel[item.field])"
        ></uni-data-checkbox>
      </view>

      <!-- 多选     -->
      <view v-if="item.component === 'checkbox'" class="h-9 flex items-center">
        <uni-data-checkbox
          v-model="formModel[item.field]"
          multiple
          :localdata="item.props?.options"
          :disabled="item.props?.disabled ?? false"
          :selected-color="useConfig.getColor('primary')"
          @change="emitChangeEvent(item.field, formModel[item.field])"
        ></uni-data-checkbox>
      </view>

      <!-- 单选     -->
      <view
        v-if="item.component === 'picker'"
        class="h-9 w-full flex items-center"
      >
        <es-picker
          v-model="formModel[item.field]"
          :mode="item.props?.pickerType ?? 'selector'"
          :options="item.props?.options ?? []"
          :disabled="item.props?.disabled ?? false"
          :placeholder="item.props?.placeholder"
          @change="emitChangeEvent(item.field, formModel[item.field])"
        ></es-picker>
      </view>
    </uni-forms-item>
    <es-button
      type="primary"
      size="large"
      text="提交"
      fixed
      block
      @click="handleSubmit"
    />
  </uni-forms>
</template>

<style scoped lang="scss">
:deep(.uni-input-placeholder),
:deep(.uni-input-input),
:deep(.checklist-text) {
  font-size: 32rpx !important;
}

:deep(.uni-forms-item__error) {
  font-size: 28rpx;
}

:deep(.uni-easyinput__content-input) {
  padding-left: 0 !important;
}

:deep(.icon-calendar) {
  display: none;
}

:deep(.is-first-border) {
  border: none;
}

:deep(.uni-date),
:deep(.uni-date-editor) {
  height: 100%;
}
</style>
