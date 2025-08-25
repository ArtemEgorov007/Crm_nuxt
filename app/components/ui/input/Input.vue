<script setup lang="ts">
interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  success?: boolean
  required?: boolean
  autocomplete?: string
  name?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  success: false,
  required: false,
  autocomplete: 'off'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const inputId = computed(
    () => props.id || `input-${Math.random().toString(36).slice(2, 9)}`
)
</script>

<template>
  <div class="ui-input">
    <label
        v-if="label"
        :for="inputId"
        class="ui-input__label"
        :class="{ 'ui-input__label--required': required }"
    >
      {{ label }}
    </label>

    <input
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :name="name"
        :aria-invalid="!!error"
        :aria-required="required"
        class="ui-input__field"
        :class="{
        'ui-input__field--error': error,
        'ui-input__field--success': success,
        'ui-input__field--disabled': disabled
      }"
    />

    <p v-if="error" class="ui-input__error">
      {{ error }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.ui-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: var(--spacing-4);

  &__label {
    margin-bottom: var(--spacing-2);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    font-size: var(--font-size-sm);

    &--required::after {
      content: " *";
      color: var(--color-danger);
    }
  }

  &__field {
    width: 100%;
    padding: var(--spacing-3) var(--spacing-4);
    border: var(--border-width) solid var(--color-input-border);
    border-radius: var(--radius-md);
    background-color: var(--color-input-bg);
    color: var(--color-input-text);
    font-family: inherit;
    font-size: var(--font-size-base);
    line-height: 1.5;
    transition: border-color var(--transition-normal) ease,
    box-shadow var(--transition-normal) ease;

    &::placeholder {
      color: var(--color-input-placeholder);
    }

    &:focus {
      outline: none;
      border-color: var(--color-input-border-focus);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &:hover:not(:disabled):not(:focus) {
      border-color: var(--color-input-border-hover);
    }

    &--error {
      border-color: var(--color-danger);

      &:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    }

    &--success {
      border-color: var(--color-success);

      &:focus {
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
      }
    }

    &--disabled {
      background-color: var(--color-input-disabled-bg);
      color: var(--color-input-disabled-text);
      cursor: not-allowed;

      &::placeholder {
        color: var(--color-input-disabled-text);
      }
    }
  }

  &__error {
    margin-top: var(--spacing-2);
    color: var(--color-danger);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }
}

@media (max-width: 768px) {
  .ui-input {
    margin-bottom: var(--spacing-3);

    &__field {
      padding: var(--spacing-2) var(--spacing-3);
    }
  }
}
</style>

<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash; Базовый input &ndash;&gt;-->
<!--    <UiInput-->
<!--        v-model="username"-->
<!--        label="Имя пользователя"-->
<!--        placeholder="Введите имя пользователя"-->
<!--    />-->

<!--    &lt;!&ndash; Input с ошибкой &ndash;&gt;-->
<!--    <UiInput-->
<!--        v-model="email"-->
<!--        label="Email"-->
<!--        placeholder="example@mail.com"-->
<!--        type="email"-->
<!--        :error="emailError"-->
<!--    />-->

<!--    &lt;!&ndash; Input с подсказкой об успехе &ndash;&gt;-->
<!--    <UiInput-->
<!--        v-model="password"-->
<!--        label="Пароль"-->
<!--        placeholder="Введите пароль"-->
<!--        type="password"-->
<!--        :success="isPasswordValid"-->
<!--    />-->

<!--    &lt;!&ndash; Обязательное поле &ndash;&gt;-->
<!--    <UiInput-->
<!--        v-model="requiredField"-->
<!--        label="Обязательное поле"-->
<!--        placeholder="Это поле обязательно"-->
<!--        :required="true"-->
<!--    />-->

<!--    &lt;!&ndash; Отключенный input &ndash;&gt;-->
<!--    <UiInput-->
<!--        v-model="disabledField"-->
<!--        label="Отключенное поле"-->
<!--        placeholder="Это поле отключено"-->
<!--        :disabled="true"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->
