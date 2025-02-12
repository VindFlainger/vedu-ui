<template>
    <div>
        <div>
            <p class="flex gap-1.5 items-center mb-5 font-nunito text-lg font-extrabold text-primary-700"> 
				<u-icon class="relative bottom-px" value="AcademicCap" solid color="primary-700" :size="20"/>
				Образование
			</p>
            <div class="grid grid-cols-2 gap-x-7">
                <UInput label="Адрес" info-line />
                <UInput label="Почтовый индекс" info-line />
                <USelect label="Страна" info-line />
                <USelect label="Город" info-line />
                <UInput label="Email address" type="email" />
                <UInputPhone label="Phone number" v-model:country="country" v-model="phone" />
            </div>
        </div>
        <div class="mt-12">
            <p class="flex gap-1.5 items-center mb-5 font-nunito text-lg font-extrabold text-primary-700"> 
				<u-icon class="relative bottom-px" value="BuildingOffice2" solid color="primary-700" :size="20"/>
				Опыт
			</p>
            <div class="grid grid-cols-2 gap-x-7">
                <UInput label="Адрес" info-line />
                <UInput label="Почтовый индекс" info-line  />
                <USelect label="Страна" info-line />
                <USelect label="Город" info-line />
                <UInput label="Email address" type="email" />
                <UInputPhone label="Phone number" v-model:country="country" v-model="phone" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style></style>
